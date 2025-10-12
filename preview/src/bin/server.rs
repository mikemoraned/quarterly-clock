use std::time::Duration;

use headless_chrome::{Browser, LaunchOptionsBuilder};
use actix_web::{get, App, HttpServer, HttpResponse, Responder};
use actix_web::middleware::Logger;

#[get("/screenshot.png")]
async fn screenshot() -> impl Responder {
    match grab_screenshot() {
        Ok(png_data) => HttpResponse::Ok().content_type("image/png").body(png_data),
        Err(e) => {
            log::error!("failed to grab screenshot: {}", e);
            HttpResponse::InternalServerError().body("oops")
        }
    }
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("hello!")
}

fn grab_screenshot() -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let browser = Browser::new(
        LaunchOptionsBuilder::default()
        .idle_browser_timeout(Duration::from_secs(5 * 60))
        .sandbox(false)
        .build().unwrap()
    )?;
    log::info!("created browser");
    
    let png_data = preview::grab::grab_screenshot(&browser)?;
    log::info!("got png data");
    log::info!("peek: {:02X?}", &png_data[0 .. 8]);

    Ok(png_data)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_BACKTRACE", "1");
    
    println!("setting up logging, next message should be from log");
    env_logger::init();
    log::info!("logging setup completed");

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .service(hello)
            .service(screenshot)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}