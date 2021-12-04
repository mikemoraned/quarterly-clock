use headless_chrome::{protocol::page::ScreenshotFormat, Browser};
use failure::Fallible;
use image::io::Reader as ImageReader;
use std::io::Cursor;
use std::{thread, time};

fn main() -> Fallible<()> {
    let browser = Browser::connect("ws://127.0.0.1:9222/devtools/browser/248bd3d3-8975-4962-b001-20dac904bfda".into())?;
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
    
    let png_image = ImageReader::new(Cursor::new(png_data))
        .with_guessed_format()?
        .decode()?;
    println!("parsed as png image");

    png_image.save("screenshot.png")?;
    println!("saved as png file");

    Ok(())
}
