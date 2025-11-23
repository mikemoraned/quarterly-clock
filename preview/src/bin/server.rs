use axum::{extract::State, http::{header, HeaderMap, StatusCode}, response::{IntoResponse, Response}, routing::get, Router};
use bytes::Bytes;
use headless_chrome::{Browser, LaunchOptionsBuilder};
use tower_http::{trace::TraceLayer};
use tower::ServiceBuilder;
use tracing::{error, info};
use std::time::Duration;
use preview::cleanup;

#[derive(Clone, Debug)]
struct AppState {
    url: String,
}

impl AppState {
    fn from_env() -> Self {
        Self {
            url: std::env::var("APP_URL").unwrap_or_else(|_| "https://quarterly.houseofmoran.io/".to_string()),
        }
    }
}

#[derive(Debug)]
enum AppError {
    FailedToGrabScreenshot,
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        match self {
            AppError::FailedToGrabScreenshot => {
                let body = "failed to grab screenshot";
                (StatusCode::INTERNAL_SERVER_ERROR, body).into_response()
            }
        }
    }
}

async fn health() -> impl IntoResponse {
    info!("health check");
    (StatusCode::OK, "healthy")
}

async fn screenshot(State(state): State<AppState>) -> Result<Png, AppError> {
    match grab_screenshot(&state.url) {
        Ok(png) => Ok(png),
        Err(e) => {
            error!("failed to grab screenshot: {}", e);
            Err(AppError::FailedToGrabScreenshot)
        }
    }
}

struct Png(Vec<u8>);

impl IntoResponse for Png {
    fn into_response(self) -> Response {
        let bytes = Bytes::from(self.0);

        let mut headers = HeaderMap::new();
        headers.insert(header::CONTENT_TYPE, "image/png".parse().unwrap());
        headers.insert(header::CONTENT_LENGTH, bytes.len().to_string().parse().unwrap());

        (headers, bytes).into_response()
    }
}

fn grab_screenshot(url: &str) -> Result<Png, Box<dyn std::error::Error>> {
    let browser = Browser::new(
        LaunchOptionsBuilder::default()
        .idle_browser_timeout(Duration::from_secs(5 * 60))
        .sandbox(false)
        .build().unwrap()
    )?;
    info!("created browser");

    let png_data = preview::grab::grab_screenshot(&browser, url)?;
    info!("got png data");
    info!("peek: {:02X?}", &png_data[0 .. 8]);

    Ok(Png(png_data))
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_BACKTRACE", "1");
    
    println!("setting up logging, next message should be from log (if log-level set to INFO)");
    tracing_subscriber::fmt::init();
    info!("logging setup completed");

    let cleanup_mode = match std::env::var("CLEANUP_MODE").ok().as_deref() {
        Some("watch") => Some(cleanup::CleanupMode::Watch),
        Some("delete") => Some(cleanup::CleanupMode::Delete),
        _ => None,
    };

    if let Some(mode) = cleanup_mode {
        info!("starting tmp cleanup task in {:?} mode", mode);
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(cleanup::TMP_MAX_AGE);
            loop {
                interval.tick().await;
                cleanup::cleanup_tmp(mode).await;
            }
        });
    } else {
        info!("tmp cleanup task disabled");
    }

    let state = AppState::from_env();
    info!("Using state: {:?}", state);

    let app = Router::new()
        .route("/", get(health))
        .route("/screenshot.png", get(screenshot))
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
        )
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await
}
