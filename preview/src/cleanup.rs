use std::error::Error;
use std::path::{Path, PathBuf};
use std::time::{Duration, SystemTime};

use tokio::fs;
use tokio::io;

#[derive(Debug, Clone)]
pub struct FileCandidate {
    pub path: PathBuf,
    pub file_name: String,
    pub last_used: SystemTime,
}

impl FileCandidate {
    pub fn new(path: impl Into<PathBuf>, last_used: SystemTime) -> io::Result<Self> {
        let path: PathBuf = path.into();
        let file_name = path
            .file_name()
            .ok_or_else(|| io::Error::new(io::ErrorKind::InvalidData, "invalid file name"))?
            .to_string_lossy()
            .into_owned();
        Ok(Self {
            path,
            file_name,
            last_used,
        })
    }

    pub fn used_age(&self, now: SystemTime) -> Result<Duration, Box<dyn Error + Send + Sync>> {
        Ok(now.duration_since(self.last_used)?)
    }
}

/// List files in the given directory, capturing the newest of created/last-accessed timestamps as `last_used`.
pub async fn list_files(dir: impl AsRef<Path>) -> io::Result<Vec<FileCandidate>> {
    let mut entries = fs::read_dir(dir).await?;
    let mut files = Vec::new();
    while let Some(entry) = entries.next_entry().await? {
        let file_type = entry.file_type().await?;
        if file_type.is_file() {
            let metadata = entry.metadata().await?;

            let created = metadata.created()?;
            let modified = metadata.modified()?;
            let accessed = metadata.accessed()?;
            let last_used = created.max(modified).max(accessed);

            files.push(FileCandidate::new(entry.path(), last_used)?);
        }
    }

    Ok(files)
}

/// Keep only files whose names start with `prefix` and whose `used_age` is more than `max_age`
/// relative to `now`.
pub fn old_files_with_prefix(
    files: Vec<FileCandidate>,
    prefix: &str,
    max_age: Duration,
    now: SystemTime,
) -> Result<Vec<FileCandidate>, Box<dyn Error + Send + Sync>> {
    let mut matched = Vec::new();

    for file in files {
        if file.file_name.starts_with(prefix) {
            let age = file.used_age(now)?;
            if age > max_age {
                matched.push(file);
            }
        }
    }

    Ok(matched)
}

/// Attempt to delete each file; returns the per-file result so callers can log failures.
pub async fn delete_files(files: Vec<FileCandidate>) -> Vec<(PathBuf, io::Result<()>)> {
    let mut results = Vec::new();

    for file in files {
        let path = file.path.clone();
        let outcome = fs::remove_file(&path).await;
        results.push((path, outcome));
    }

    results
}

#[cfg(test)]
mod tests {
    use super::*;

    fn fixed_now() -> SystemTime {
        SystemTime::UNIX_EPOCH + Duration::from_secs(1_000_000)
    }

    #[test]
    fn filters_by_prefix() {
        let now = fixed_now();
        let max_age = Duration::from_secs(300);
        let old = now - Duration::from_secs(301);

        let files = vec![
            FileCandidate::new("drop_alpha1", old).unwrap(),
            FileCandidate::new("keep_beta", old).unwrap(),
            FileCandidate::new("drop_alpha2", old).unwrap(),
        ];

        let stale = old_files_with_prefix(files, "drop_", max_age, now).unwrap();
        let names: Vec<_> = stale
            .into_iter()
            .map(|f| f.file_name)
            .collect();

        assert_eq!(names, vec!["drop_alpha1", "drop_alpha2"]);
    }

    #[test]
    fn filters_by_staleness() {
        let now = fixed_now();
        let max_age = Duration::from_secs(300);
        let old = now - Duration::from_secs(301);
        let recent = now - Duration::from_secs(60);

        let files = vec![
            FileCandidate::new("file_old", old).unwrap(),
            FileCandidate::new("file_recent", recent).unwrap(),
        ];

        let stale = old_files_with_prefix(files, "file", max_age, now).unwrap();
        let names: Vec<_> = stale
            .into_iter()
            .map(|f| f.file_name)
            .collect();

        assert_eq!(names, vec!["file_old"]);
    }
}
