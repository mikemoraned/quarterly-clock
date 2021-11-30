use headless_chrome::{protocol::page::ScreenshotFormat, Browser, LaunchOptionsBuilder};
use failure::Fallible;
use image::io::Reader as ImageReader;
use std::io::Cursor;

fn main() -> Fallible<()> {
    let browser = Browser::new(LaunchOptionsBuilder::default().build().unwrap())?;
    println!("created browser");
    
    let tab = browser.wait_for_initial_tab()?;
    println!("got tab");
    
    let viewport = tab.navigate_to("https://en.wikipedia.org/wiki/WebKit")?
        .wait_for_element("#mw-content-text > div > table.infobox.vevent")?
        .get_box_model()?
        .margin_viewport();
    println!("got viewport");
    
    let png_data = tab.capture_screenshot(ScreenshotFormat::PNG, Some(viewport), true)?;
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
