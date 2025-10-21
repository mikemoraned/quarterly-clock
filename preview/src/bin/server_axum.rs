use axum::{http::StatusCode, response::IntoResponse, routing::get, Router};
use tower_http::{trace::TraceLayer};
use tower::ServiceBuilder;
use tracing::info;

async fn health() -> impl IntoResponse {
    info!("health check");
    (StatusCode::OK, "healthy")
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_BACKTRACE", "1");
    
    println!("setting up logging, next message should be from log (if log-level set to INFO)");
    tracing_subscriber::fmt::init();
    info!("logging setup completed");

    let app = Router::new()
        .route("/", get(health))
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
        );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await
}