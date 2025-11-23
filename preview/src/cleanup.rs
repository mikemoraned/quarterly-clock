use std::path::{Path, PathBuf};
use std::time::{Duration, SystemTime};

use tokio::fs;
use tokio::io;

#[derive(Debug, Clone)]
pub struct TmpFileInfo {
    pub path: PathBuf,
    pub created: Option<SystemTime>,
    pub accessed: Option<SystemTime>,
}

/// List files in `tmp_dir`, capturing their created and last accessed times when available.
pub async fn list_tmp_files(tmp_dir: impl AsRef<Path>) -> io::Result<Vec<TmpFileInfo>> {
    let mut entries = fs::read_dir(tmp_dir).await?;
    let mut files = Vec::new();

    while let Some(entry) = entries.next_entry().await? {
        let file_type = entry.file_type().await?;
        if !file_type.is_file() {
            continue;
        }

        let metadata = entry.metadata().await?;

        files.push(TmpFileInfo {
            path: entry.path(),
            created: metadata.created().ok(),
            accessed: metadata.accessed().ok(),
        });
    }

    Ok(files)
}

/// Keep only files whose names start with `prefix` and have not been created or accessed
/// within the last `stale_for` duration.
pub fn stale_files_with_prefix(
    files: Vec<TmpFileInfo>,
    prefix: &str,
    stale_for: Duration,
) -> Vec<TmpFileInfo> {
    files
        .into_iter()
        .filter(|file| {
            let name = match file.path.file_name().and_then(|name| name.to_str()) {
                Some(name) => name,
                None => return false,
            };

            if !name.starts_with(prefix) {
                return false;
            }

            let created_stale = file
                .created
                .map(|time| older_than(time, stale_for))
                .unwrap_or(false);
            let accessed_stale = file
                .accessed
                .map(|time| older_than(time, stale_for))
                .unwrap_or(false);

            created_stale && accessed_stale
        })
        .collect()
}

fn older_than(time: SystemTime, duration: Duration) -> bool {
    matches!(SystemTime::now().duration_since(time), Ok(elapsed) if elapsed >= duration)
}

/// Attempt to delete each file; returns the per-file result so callers can log failures.
pub async fn delete_files(files: Vec<TmpFileInfo>) -> Vec<(PathBuf, io::Result<()>)> {
    let mut results = Vec::new();

    for file in files {
        let path = file.path.clone();
        let outcome = fs::remove_file(&path).await;
        results.push((path, outcome));
    }

    results
}
