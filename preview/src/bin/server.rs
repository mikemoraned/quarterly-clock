use core::time;
use std::thread;

use headless_chrome::{protocol::page::ScreenshotFormat, Browser, LaunchOptionsBuilder};
use failure::Fallible;
use actix_web::{get, App, HttpServer, HttpResponse, Responder};
use actix_web::middleware::Logger;
use log;
use env_logger::Env;
use dotenv;

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

fn grab_screenshot() -> Fallible<Vec<u8>> {
    let browser = Browser::new(LaunchOptionsBuilder::default().sandbox(false).build().unwrap())?;
    log::info!("created browser");
    
    let tab = browser.wait_for_initial_tab()?;
    log::info!("got tab");

    tab.navigate_to("https://quarterly.houseofmoran.io/")?;
    log::info!("navigated");
    tab.wait_for_element("#container > svg")?;
    log::info!("got SVG");
    let wait_duration = time::Duration::from_millis(1000);
    thread::sleep(wait_duration);
    log::info!("waited {:?}", wait_duration);
 
    let png_data = tab.capture_screenshot(ScreenshotFormat::PNG, None, true)?;
    log::info!("got png data");
    log::info!("peek: {:02X?}", &png_data[0 .. 8]);

    Ok(png_data)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_BACKTRACE", "1");
    
    println!("setting up logging, next message should be from log");
    let env_logger = env_logger::Builder::from_env(Env::default().default_filter_or("info")).build();
    let sentry_logger = sentry_log::SentryLogger::with_dest(env_logger);
    log::set_boxed_logger(Box::new(sentry_logger)).unwrap();
    log::set_max_level(log::LevelFilter::Info);
    
    let sentry_dsn= dotenv::var("SENTRY_DSN").unwrap();
    let _guard = sentry::init((sentry_dsn, sentry::ClientOptions {
        release: sentry::release_name!(),
        ..Default::default()
    }));
    log::info!("logging setup completed");

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(sentry_actix::Sentry::new())
            .service(hello)
            .service(screenshot)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}