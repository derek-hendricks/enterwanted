import {
  Builder,
  Capabilities,
  WebDriver
} from "selenium-webdriver";
import { EnterWantedPage } from "./pageObjects/EnterWantedPageClass";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

describe("the todo app", () => {
  const enterWantedPage: EnterWantedPage = new EnterWantedPage(driver);

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
    const headerErrorMessage = await driver.findElements(enterWantedPage.headerErrorMessage);
    expect(headerErrorMessage.length).toBe(1);
  });

// https://dmutah.atlassian.net/browse/DH6DL-35
it("The header field accepts a value that is between 9 and 19 characters in length", async () => {
  await enterWantedPage.enterHeaderInput("qwertyuio");
  await enterWantedPage.clickSubmit();
  const headerErrorMessage = await driver.findElements(enterWantedPage.headerErrorMessage);
  expect(headerErrorMessage.length).toBe(0);
});

// https://dmutah.atlassian.net/browse/DH6DL-36
it("The header field does not accept a value that is greater than 19 characters in length", async () => {
  await enterWantedPage.enterHeaderInput("qwertyuiopqwertyuiop");
  await enterWantedPage.clickSubmit();
  const headerErrorMessage = await driver.findElements(enterWantedPage.headerErrorMessage);
  expect(headerErrorMessage.length).toBe(1);
});

// TODO: create jira test case and add link here
it("The MKE field does not accept a value that is less than 2 characters in length", async () => {
  await enterWantedPage.enterMkeInput("q");
  await enterWantedPage.clickSubmit();
  const mkeErrorMessage = await driver.findElements(enterWantedPage.mkeErrorMessage);
  expect(mkeErrorMessage.length).toBe(1);
});

// TODO: create jira test case and add link here
it("The MKE field accepts a value that is between 2 and 4 characters in length", async () => {
  await enterWantedPage.enterMkeInput("qw");
  await enterWantedPage.clickSubmit();
  const mkeErrorMessage = await driver.findElements(enterWantedPage.mkeErrorMessage);
  expect(mkeErrorMessage.length).toBe(0);
});

// TODO: create jira test case and add link here
it("The MKE field does not accept a value that is greater than 4 characters in length", async () => {
  await enterWantedPage.enterMkeInput("qwert");
  await enterWantedPage.clickSubmit();
  const mkeErrorMessage = await driver.findElements(enterWantedPage.mkeErrorMessage);
  expect(mkeErrorMessage.length).toBe(1);
});

});
