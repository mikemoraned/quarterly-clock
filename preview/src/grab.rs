use core::time;
use std::thread;

use headless_chrome::protocol::cdp::Page;
use headless_chrome::{Browser};
use log;

pub fn grab_screenshot(browser: &Browser) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
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