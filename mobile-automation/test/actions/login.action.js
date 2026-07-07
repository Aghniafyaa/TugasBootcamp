import loginPage from '../pageobjects/login.page'

export class LoginAction {

    async enterUsername(username) {
        const field = await $(loginPage.usernameInput)
        await field.waitForDisplayed()
        await field.setValue(username)
    }

    async enterPassword(password) {
        const field = await $(loginPage.passwordInput)
        await field.waitForDisplayed()
        await field.setValue(password)
    }

    async tapLogin() {
        const btn = await $(loginPage.loginButton)
        await btn.waitForDisplayed()
        await btn.click()
    }

    async login(username, password) {
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.tapLogin()
    }

    async waitForProducts() {
        const products = await $(loginPage.productsTitle)
        await products.waitForDisplayed({ timeout: 10000 })
        return await products.isDisplayed()
    }

    async isOnLoginPage() {
        const btn = await $(loginPage.loginButton)
        await btn.waitForDisplayed({ timeout: 10000 })
        return await btn.isDisplayed()
    }

    async isErrorDisplayed(){
        const error = await $(loginPage.errorMessage)
        await error.waitForDisplayed()
        return error.isDisplayed()
    }
}

export default new LoginAction()