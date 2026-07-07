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

    get errorMessage(){
        return 'android=new UiSelector().text("Username and password do not match any user in this service.")'
    }

}

export default new LoginPage()