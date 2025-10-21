use headless_chrome::{Browser, LaunchOptionsBuilder};
use image::ImageReader;
use preview::grab::grab_screenshot;
use tracing::info;
use std::io::Cursor;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    std::env::set_var("RUST_BACKTRACE", "1");
    
    println!("setting up logging, next message should be from log (if log-level set to INFO)");
    tracing_subscriber::fmt::init();
    info!("logging setup completed");

    let browser = Browser::new(LaunchOptionsBuilder::default().sandbox(false).build().unwrap())?;
    info!("created browser");
    
    let png_data = grab_screenshot(&browser, "https://quarterly.houseofmoran.io/")?;
    info!("got png data");
    info!("peek: {:02X?}", &png_data[0 .. 8]);
    
    let png_image = ImageReader::new(Cursor::new(png_data))
        .with_guessed_format()?
        .decode()?;
    info!("parsed as png image");

    png_image.save("screenshot.png")?;
    info!("saved as png file");

    Ok(())
}
