import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement,
  WebElementPromise
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();


class TodoPageClass {
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  url: string = "https://devmountain.github.io/qa_todos/";
  driver: WebDriver;
  todoInput: By = By.css('.new-todo');
  todos: By = By.css('.todo');
  todoLabel: By = By.css('.todo label');
  todoComplete: By = By.css('.todo input.toggle');
  clearCompletedButton: By = By.css('.clear-completed');
  todoStar: By = By.css('.star');
  todoStarred: By = By.css('.starred');

  todoByContainsText (elementText: string): By {
   return By.xpath(`//*[contains(text(),'${elementText}')]`);
  }

  public async addTodoToList(text: string): Promise<void> {
    let todoTextValue = `${text}\n`;
    await driver.wait(until.elementLocated(this.todoInput));
    let todoElement = await driver.findElement(this.todoInput);
    await todoElement.sendKeys(todoTextValue);
  }

  public async removeTodoFromList(text: string): Promise<void> {
    let myTodos = await driver.findElements(this.todos);
    await myTodos
      .filter(async (todo) => {
        (await (await todo.findElement(this.todoLabel)).getText()) ==
          text;
      })[0]
      .findElement(this.todoComplete)
      .click();
    await (await driver.findElement(this.clearCompletedButton)).click();
  }

  public async markTodoWithStar(text: string): Promise<void> {
    let myTodos = await driver.findElements(this.todos);
    await myTodos
      .filter(async (todo) => {
        (await (await todo.findElement(this.todoLabel)).getText()) ==
          text;
      })[0]
      .findElement(this.todoStar)
      .click();
    
  }
}

describe("the todo app", () => {
  const todoPage: TodoPageClass = new TodoPageClass(driver);
  beforeEach(async () => {
    await driver.get(todoPage.url);
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("can add a todo", async () => {
    let myTodosBefore: WebElement[] = await driver.findElements(todoPage.todos);
    expect(myTodosBefore).toHaveLength(0);
    const newTodoText: string = "new todo 123 123";
    await todoPage.addTodoToList(newTodoText);
    let myTodosAfter: WebElement[] = await driver.findElements(todoPage.todos);
    let todoTextValue: string = await driver.findElement(todoPage.todoByContainsText(newTodoText)).getText();
    expect(todoTextValue).toEqual(newTodoText);
    expect(myTodosAfter).toHaveLength(1);
  });

  it("can remove a todo", async () => {
    let myTodosBeforeRemove: WebElement[] = await driver.findElements(todoPage.todos);
    expect(myTodosBeforeRemove).toHaveLength(1);
    const newTodoText: string = "new todo 123 123";
    await todoPage.removeTodoFromList(newTodoText);
    let myTodosAfterRemove: WebElement[] = await driver.findElements(todoPage.todos);
    expect(myTodosAfterRemove).toHaveLength(0);
  });

  it("can mark a todo with a star", async () => {
    let notStarredTodos: WebElement[] = await driver.findElements(todoPage.todoStarred);
    expect(notStarredTodos).toHaveLength(0);
    const newTodoText: string = "new todo star 1";
    await todoPage.addTodoToList(newTodoText);
    await todoPage.markTodoWithStar(newTodoText);
    let starredTodos: WebElement[] = await driver.findElements(todoPage.todoStarred);
    expect(starredTodos).toHaveLength(1);
   });

  it("has the right number of todos listed", async () => { 
    let todosBefore: WebElement[] = await driver.findElements(todoPage.todos);
    const todosBeforeLength: number = todosBefore.length;
    const newTodoText1: string = "new todo 1";
    const newTodoText2: string = "new todo 2";
    const newTodoText3: string = "new todo 3";
    const newTodoText4: string = "new todo 4";
    const newTodoText5: string = "new todo 5";
    await todoPage.addTodoToList(newTodoText1);
    await todoPage.addTodoToList(newTodoText2);
    await todoPage.addTodoToList(newTodoText3);
    await todoPage.addTodoToList(newTodoText4);
    await todoPage.addTodoToList(newTodoText5);
    let todosAfter: WebElement[] = await driver.findElements(todoPage.todos);
    const todosAfterLength: number = todosAfter.length;
    expect(todosAfterLength).toBeGreaterThan(todosBeforeLength);
  });
});
