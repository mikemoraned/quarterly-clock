use headless_chrome::{Browser, LaunchOptionsBuilder};
use image::ImageReader;
use preview::grab::grab_screenshot;
use std::io::Cursor;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    std::env::set_var("RUST_BACKTRACE", "1");
    
    println!("setting up logging, next message should be from log");
    env_logger::init();
    log::info!("logging setup completed");

    let browser = Browser::new(LaunchOptionsBuilder::default().sandbox(false).build().unwrap())?;
    log::info!("created browser");
    
    let png_data = grab_screenshot(&browser)?;
    println!("got png data");
    println!("peek: {:02X?}", &png_data[0 .. 8]);
    
    let png_image = ImageReader::new(Cursor::new(png_data))
        .with_guessed_format()?
        .decode()?;
    println!("parsed as png image");

    png_image.save("screenshot.png")?;
    println!("saved as png file");

    Ok(())
}
