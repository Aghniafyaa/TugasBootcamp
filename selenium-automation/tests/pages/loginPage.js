const { By } = require('selenium-webdriver');
const LOGIN_LOCATORS = require('../locators/loginPageLocator');

class LoginPage {

    constructor(driver){
        this.driver = driver;
    }

    async open(){
        await this.driver.get(LOGIN_LOCATORS.url);
    }

    async enterUsername(username){
        await this.driver.findElement(
            By.id(LOGIN_LOCATORS.selectors.usernameInput.value)
        ).sendKeys(username);
    }

    async enterPassword(password){
        await this.driver.findElement(
            By.id(LOGIN_LOCATORS.selectors.passwordInput.value)
        ).sendKeys(password);
    }

    async clickLogin(){
        await this.driver.findElement(
            By.id(LOGIN_LOCATORS.selectors.loginButton.value)
        ).click();
    }

    async login(username,password){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async getErrorMessage(){
        return await this.driver.findElement(
            By.css(LOGIN_LOCATORS.selectors.errorMessage.value)
        ).getText();
    }

    async getCurrentUrl(){
    return await this.driver.getCurrentUrl();
    }

    async isInventoryDisplayed(){
    return await this.driver.findElement(
        By.className("title")
    ).getText();
    }

}

module.exports = LoginPage;