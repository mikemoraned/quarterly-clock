use headless_chrome::protocol::cdp::Page;
use headless_chrome::Browser;
use image::ImageReader;
use std::io::Cursor;
use std::{thread, time};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let browser = Browser::connect("ws://0.0.0.0:9222/devtools/browser/5f3073e9-d8d9-48ec-bfdd-4b556947ac52".into())?;
    println!("created browser");
    
    let tab = browser.new_tab()?;
    println!("got tab");

    tab.navigate_to("https://quarterly.houseofmoran.io/")?;
    println!("navigated");
    tab.wait_for_element("#container > svg")?;
    println!("got SVG");
    let wait_duration = time::Duration::from_millis(1000);
    thread::sleep(wait_duration);
    println!("waited {:?}", wait_duration);

    let png_data = tab.capture_screenshot(Page::CaptureScreenshotFormatOption::Png, None, None, true)?;
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
