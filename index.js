const { Builder, By } = require("selenium-webdriver");
var assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

async function checkIfTitleExistsAndNavigate() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments("--headless"))
    .setChromeOptions(new chrome.Options().addArguments("--no-sandbox"))
    .build();
  const getMainRoute = await driver.get("https://phptravels.com/demo");
  const [mainRoute, mainRouteError] = await promiseResolver(getMainRoute);
  const getHeaderTitle = await (
    await driver.findElement(By.id("header-title"))
  ).getAttribute("innerHTML");
  const [headerTitle, headerTitleError] = await promiseResolver(getHeaderTitle);

  if (mainRouteError || headerTitleError) {
    console.log("An error occured while executing this script: " + mainRouteError +
    headerTitleError );
  }

  assert.equal("Application Test Drive", getHeaderTitle);
  pressOnIntegrationsTab(driver);
}

async function pressOnIntegrationsTab(driver) {
  const clickOnIntegrationsTab = await (await driver.findElement(By.className("clearfix"))).click();
  const [integrationsTabClick, integrationsTabClickError] = await promiseResolver(clickOnIntegrationsTab);

  if (integrationsTabClickError) {
  console.log("An error occured while clicking on integrations tab: " + integrationsTabClickError);
  }
}

(async function () {
  return await checkIfTitleExistsAndNavigate();
})();

async function promiseResolver(promise) {
  try {
    const data = await new Promise ((resolve, reject) => {resolve (1);});
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}
