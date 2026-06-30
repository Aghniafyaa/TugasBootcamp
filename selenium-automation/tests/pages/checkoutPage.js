const { By, until } = require('selenium-webdriver');
const CHECKOUT_LOCATORS = require('../locators/checkoutPageLocator');

class CheckoutPage {

    constructor(driver){
        this.driver = driver;
    }

    async waitCartLoaded(){
        await this.driver.wait(
            until.elementLocated(
                By.id(CHECKOUT_LOCATORS.selectors.checkoutButton.value)
            ),
            5000
        );
    }

    async clickViaJs(element){
        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block: 'center'}); arguments[0].click();",
            element
        );
    }

    async clickCheckout(){

        const button = await this.driver.wait(
            until.elementLocated(
                By.id(CHECKOUT_LOCATORS.selectors.checkoutButton.value)
            ),
            5000
        );

        await this.driver.wait(
            until.elementIsVisible(button),
            5000
        );

        await this.clickViaJs(button);

        await this.driver.wait(
            until.urlContains("checkout-step-one"),
            5000
        );
    }

    async waitCheckoutInformationLoaded(){

        const input = await this.driver.wait(
            until.elementLocated(
                By.id(CHECKOUT_LOCATORS.selectors.firstNameInput.value)
            ),
            5000
        );

        await this.driver.wait(
            until.elementIsVisible(input),
            5000
        );
    }

    async fillInput(locatorId, text){

        const input = await this.driver.wait(
            until.elementLocated(By.id(locatorId)),
            5000
        );

        await this.driver.wait(
            until.elementIsVisible(input),
            5000
        );

        const maxAttempts = 3;

        const setValueScript = `
            const input = arguments[0];
            const text = arguments[1];
            const nativeSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype, 'value'
            ).set;
            input.focus();
            nativeSetter.call(input, text);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        `;

        for (let attempt = 1; attempt <= maxAttempts; attempt++){

            await this.driver.executeScript(setValueScript, input, text);

            // Baca .value lewat JS langsung (bukan getAttribute), karena
            // getAttribute("value") membaca atribut HTML awal, bukan
            // property DOM live yang berubah saat user/JS mengetik.
            const value = await this.driver.executeScript(
                "return arguments[0].value;",
                input
            );

            if (value === text){
                console.log(`[${locatorId}] filled successfully:`, value);
                return;
            }

            console.log(`[${locatorId}] attempt ${attempt} failed, got:`, value);

            await this.driver.sleep(300);
        }

        throw new Error(`Failed to fill input #${locatorId} with value "${text}" after ${maxAttempts} attempts`);
    }

    async enterFirstName(firstName){
        await this.fillInput("first-name", firstName);
    }

    async enterLastName(lastName){
        await this.fillInput("last-name", lastName);
    }

    async enterPostalCode(postalCode){
        await this.fillInput("postal-code", postalCode);
    }

    async clickContinue(){

        const button = await this.driver.wait(
            until.elementLocated(
                By.id(CHECKOUT_LOCATORS.selectors.continueButton.value)
            ),
            5000
        );

        await this.driver.wait(
            until.elementIsVisible(button),
            5000
        );

        await this.clickViaJs(button);

        await this.driver.wait(
            until.urlContains("checkout-step-two"),
            5000
        );
    }

    async waitCheckoutOverviewLoaded(){

        const button = await this.driver.wait(
            until.elementLocated(
                By.id(CHECKOUT_LOCATORS.selectors.finishButton.value)
            ),
            5000
        );

        await this.driver.wait(
            until.elementIsVisible(button),
            5000
        );
    }

    async clickFinish(){

        const button = await this.driver.findElement(
            By.id(CHECKOUT_LOCATORS.selectors.finishButton.value)
        );

        await this.clickViaJs(button);

        await this.driver.wait(
            until.urlContains("checkout-complete"),
            5000
        );
    }

    async getCompleteMessage(){

        return await this.driver.findElement(
            By.className(CHECKOUT_LOCATORS.selectors.completeHeader.value)
        ).getText();
    }
}

module.exports = CheckoutPage;