// use headless_chrome::{protocol::page::ScreenshotFormat, Browser, LaunchOptionsBuilder};
// use failure::Fallible;
// use image::io::Reader as ImageReader;
// use std::io::Cursor;
// use std::{thread, time};

use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

// fn main() -> Fallible<()> {
//     let browser = Browser::new(LaunchOptionsBuilder::default().build().unwrap())?;
//     println!("created browser");
    
//     let tab = browser.wait_for_initial_tab()?;
//     println!("got tab");

//     tab.navigate_to("https://quarterly.houseofmoran.io/")?;
//     println!("navigated");
//     tab.wait_for_element("#container > svg")?;
//     println!("got SVG");
//     let wait_duration = time::Duration::from_millis(1000);
//     thread::sleep(wait_duration);
//     println!("waited {:?}", wait_duration);
 
//     let png_data = tab.capture_screenshot(ScreenshotFormat::PNG, None, true)?;
//     println!("got png data");
//     println!("peek: {:02X?}", &png_data[0 .. 8]);
    
//     let png_image = ImageReader::new(Cursor::new(png_data))
//         .with_guessed_format()?
//         .decode()?;
//     println!("parsed as png image");

//     png_image.save("screenshot.png")?;
//     println!("saved as png file");

//     Ok(())
// }
