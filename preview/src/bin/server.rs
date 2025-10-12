use core::time;
use std::thread;

use headless_chrome::protocol::cdp::Page;
use headless_chrome::{Browser, LaunchOptionsBuilder};
use actix_web::{get, App, HttpServer, HttpResponse, Responder};
use actix_web::middleware::Logger;
use log;

#[get("/screenshot.png")]
async fn screenshot() -> impl Responder {
    match grab_screenshot() {
        Ok(png_data) => HttpResponse::Ok().content_type("image/png").body(png_data),
        Err(_) => HttpResponse::InternalServerError().body("oops")
    }
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("hello!")
}

fn grab_screenshot() -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let browser = Browser::new(LaunchOptionsBuilder::default().sandbox(false).build().unwrap())?;
    log::info!("created browser");
    
    let tab = browser.new_tab()?;
    log::info!("got tab");

    tab.navigate_to("https://quarterly.houseofmoran.io/")?;
    log::info!("navigated");
    tab.wait_for_element("#container > svg")?;
    log::info!("got SVG");
    let wait_duration = time::Duration::from_millis(1000);
    thread::sleep(wait_duration);
    log::info!("waited {:?}", wait_duration);
 
    let png_data = tab.capture_screenshot(Page::CaptureScreenshotFormatOption::Png, None, None, true)?;
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