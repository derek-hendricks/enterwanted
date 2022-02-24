import {
  By, until,
  WebDriver
} from "selenium-webdriver";

export class EnterWantedPage {
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
    await this.driver.wait(until.elementLocated(this.submitButton));
    let submitButton = await this.driver.findElement(this.submitButton);
    await submitButton.click();
  }
  /**
 * fills the "mke" input field with the string value passed in the parameter
 * @param {string} mkeTextValue - text input value for the mke input field
 * @returns Promise void
 */
  public async enterMkeInput(mkeTextValue: string): Promise<void> {
    await this.driver.wait(until.elementLocated(this.mkeInput));
    let mkeElement = await this.driver.findElement(this.mkeInput);
    await mkeElement.sendKeys(mkeTextValue);
  }
  /**
   * fills the "header" input field with the string value passed in the parameter
   * @param {string} headerTextValue - text input value for the header input field
   * @returns Promise void
   */
  public async enterHeaderInput(headerTextValue: string): Promise<void> {
    await this.driver.wait(until.elementLocated(this.headerInput));
    let headerElement = await this.driver.findElement(this.headerInput);
    await headerElement.sendKeys(headerTextValue);
  }
}
