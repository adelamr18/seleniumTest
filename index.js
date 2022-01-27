const { Builder, By, ChromeOptions } = require("selenium-webdriver");
var assert = require("assert");
// To prevenet the need to install chromedriver on the agent or doing any PATH handling
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());


async function checkIfTitleExistsAndNavigate() {
    // Use headless chrome for automations
    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--no-sandbox");
    
    const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get("https://phptravels.com/demo");
    const headerText = await (await driver.findElement(By.id("header-title"))).getAttribute("innerHTML");
    assert.equal("Application Test Drive", headerText);
    await pressOnIntegrationsTab(driver);
    driver.quit();
}
async function pressOnIntegrationsTab(driver) {
    await (await driver.findElement(By.className("clearfix"))).click();
}

checkIfTitleExistsAndNavigate().catch(err=>{
    console.error(err);
    process.exit(1);
});