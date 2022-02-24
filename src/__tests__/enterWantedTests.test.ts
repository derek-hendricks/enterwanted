import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

class EnterWantedPageClass {
  url: string = "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html";
  driver: WebDriver;
  headerInput: By = By.css("input[name=hdrInput]");
  mkeInput: By = By.css("input[name=mkeInput]");
  submitButton: By = By.css("#saveBtn");
  headerErrorMessage: By = By.xpath(`//*[text() = 'The "Header" field should be between 9 and 19 characters long.']`);
  mkeErrorMessage: By = By.xpath(`//*[text() = 'The "MKE" field should be between 2 and 4 characters long.']`);
  
  /**
   * Creates an instance of EnterWantedPageClass.
   * @param {WebDriver} driver - webDriver client to control browser
   */
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  /**
   * Clicks the submit button on the enter-wanted page.
   * @returns Promise void
   */
   public async clickSubmit(): Promise<void> {
    await driver.wait(until.elementLocated(this.submitButton));
    let submitButton = await driver.findElement(this.submitButton);
    await submitButton.click();
  }

    /**
   * fills the "mke" input field with the string value passed in the parameter
   * @param {string} mkeTextValue - text input value for the mke input field
   * @returns Promise void
   */
     public async enterMkeInput(mkeTextValue: string): Promise<void> {
      await driver.wait(until.elementLocated(this.mkeInput));
      let mkeElement = await driver.findElement(this.mkeInput);
      await mkeElement.sendKeys(mkeTextValue);
    }

  /**
   * fills the "header" input field with the string value passed in the parameter
   * @param {string} headerTextValue - text input value for the header input field
   * @returns Promise void
   */
  public async enterHeaderInput(headerTextValue: string): Promise<void> {
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
    let headerErrorMessage = await driver.findElements(enterWantedPage.headerErrorMessage);
    expect(headerErrorMessage.length).toBe(1);
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
  let headerErrorMessage = await driver.findElements(enterWantedPage.headerErrorMessage);
  expect(headerErrorMessage.length).toBe(1);
});

// TODO: create jira test case and add link here
it("The MKE field does not accept a value that is less than 2 characters in length", async () => {
  await enterWantedPage.enterMkeInput("q");
  await enterWantedPage.clickSubmit();
  let mkeErrorMessage = await driver.findElements(enterWantedPage.mkeErrorMessage);
  expect(mkeErrorMessage.length).toBe(1);
});

// TODO: create jira test case and add link here
it("The MKE field accepts a value that is between 2 and 4 characters in length", async () => {
  await enterWantedPage.enterMkeInput("qw");
  await enterWantedPage.clickSubmit();
  let mkeErrorMessage = await driver.findElements(enterWantedPage.mkeErrorMessage);
  expect(mkeErrorMessage.length).toBe(0);
});

// TODO: create jira test case and add link here
it("The MKE field does not accept a value that is greater than 4 characters in length", async () => {
  await enterWantedPage.enterMkeInput("qwert");
  await enterWantedPage.clickSubmit();
  let mkeErrorMessage = await driver.findElements(enterWantedPage.mkeErrorMessage);
  expect(mkeErrorMessage.length).toBe(1);
});

});
