use core::time;
use std::thread;

use headless_chrome::protocol::cdp::Page;
use headless_chrome::{Browser};
use tracing::info;

pub fn grab_screenshot(browser: &Browser, url: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let tab = browser.new_tab()?;
    info!("got tab");

    info!("navigating to {}", url);
    tab.navigate_to(url)?;
    info!("navigated");
    tab.wait_for_element("#container > svg")?;
    info!("got SVG");
    let wait_duration = time::Duration::from_millis(1000);
    thread::sleep(wait_duration);
    info!("waited {:?}", wait_duration);
 
    let png_data = tab.capture_screenshot(Page::CaptureScreenshotFormatOption::Png, None, None, true)?;
    info!("got png data");
    info!("peek: {:02X?}", &png_data[0 .. 8]);

    Ok(png_data)
}