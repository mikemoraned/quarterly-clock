use core::time;
use std::thread;

use headless_chrome::{protocol::page::ScreenshotFormat, Browser, LaunchOptionsBuilder};
use failure::Fallible;
use actix_web::{get, App, HttpServer, HttpResponse, Responder};

#[get("/screenshot.png")]
async fn screenshot() -> impl Responder {
    match grab_screenshot() {
        Ok(png_data) => HttpResponse::Ok().content_type("image/png").body(png_data),
        Err(_) => HttpResponse::InternalServerError().body("oops")
    }
}

fn grab_screenshot() -> Fallible<Vec<u8>> {
    let browser = Browser::new(LaunchOptionsBuilder::default().build().unwrap())?;
    println!("created browser");
    
    let tab = browser.wait_for_initial_tab()?;
    println!("got tab");

    tab.navigate_to("https://quarterly.houseofmoran.io/")?;
    println!("navigated");
    tab.wait_for_element("#container > svg")?;
    println!("got SVG");
    let wait_duration = time::Duration::from_millis(1000);
    thread::sleep(wait_duration);
    println!("waited {:?}", wait_duration);
 
    let png_data = tab.capture_screenshot(ScreenshotFormat::PNG, None, true)?;
    println!("got png data");
    println!("peek: {:02X?}", &png_data[0 .. 8]);

    Ok(png_data)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    HttpServer::new(|| {
        App::new()
            .service(screenshot)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}