export class LoginPage {

    get usernameInput() {
        return 'android=new UiSelector().text("Username")'
    }

    get passwordInput() {
        return 'android=new UiSelector().text("Password")'
    }

    get loginButton() {
        return 'android=new UiSelector().text("LOGIN")'
    }

    get productsTitle() {
        return 'android=new UiSelector().text("PRODUCTS")'
    }

}

export default new LoginPage()