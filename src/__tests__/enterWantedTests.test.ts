import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

class EnterWantedPageClass {
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  url: string = "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html";
  driver: WebDriver;
  headerInput: By = By.css("input[name=hdrInput]");
  submitButton: By = By.css("#saveBtn");
  headerErrorMessage: By = By.xpath(`//*[text() = 'The "Header" field should be between 9 and 19 characters long.']`);


  public async clickSubmit(): Promise<void> {
    await driver.wait(until.elementLocated(this.submitButton));
    let submitButton = await driver.findElement(this.submitButton);
    await submitButton.click();
  }

  public async enterHeaderInput(text: string): Promise<void> {
    const headerTextValue = text;
    await driver.wait(until.elementLocated(this.headerInput));
    let headerElement = await driver.findElement(this.headerInput);
    await headerElement.sendKeys(headerTextValue);
  }
}

describe("the todo app", () => {
  const enterWantedPage: EnterWantedPageClass = new EnterWantedPageClass(driver);
  beforeEach(async () => {
    await driver.get(enterWantedPage.url);
  });
  afterAll(async () => {
    await driver.quit();
  });

  // https://dmutah.atlassian.net/browse/DH6DL-34
  it("The header field does not accept a value that is less than 9 characters in length", async () => {
    await enterWantedPage.enterHeaderInput("qwertyui");
    await enterWantedPage.clickSubmit();
    let headerErrorMessage = await driver.findElement(enterWantedPage.headerErrorMessage).getText();
    expect(headerErrorMessage).toBe('The "Header" field should be between 9 and 19 characters long.');
  });

// https://dmutah.atlassian.net/browse/DH6DL-35
it("The header field accepts a value that is between 9 and 19 characters in length", async () => {
  await enterWantedPage.enterHeaderInput("qwertyuio");
  await enterWantedPage.clickSubmit();
  let headerErrorMessage = await driver.findElements(enterWantedPage.headerErrorMessage);
  expect(headerErrorMessage.length).toBe(0);
});

// https://dmutah.atlassian.net/browse/DH6DL-36
it("The header field does not accept a value that is greater than 19 characters in length", async () => {
  await enterWantedPage.enterHeaderInput("qwertyuiopqwertyuiop");
  await enterWantedPage.clickSubmit();
  let headerErrorMessage = await driver.findElement(enterWantedPage.headerErrorMessage).getText();
  expect(headerErrorMessage).toBe('The "Header" field should be between 9 and 19 characters long.');
});
});
