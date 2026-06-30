const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CheckoutPage = require('../pages/checkoutPage');

const ScreenshotPage = require('../pages/screenshotPage');
const compareImages = require('../../utilities/visualRegressionHelper');
const fs = require('fs');
const path = require('path');

const assert = require('assert');

describe('Login Tests', function () {

    let driver;
    let loginPage;
    let inventoryPage;
    let checkoutPage;
    let screenshotPage;

    beforeEach(async function () {
        const options = new chrome.Options();

        options.excludeSwitches('enable-automation');

        options.setUserPreferences({
            credentials_enable_service: false,
            profile: {
                password_manager_enabled: false
            }
        });

        options.addArguments(
            "--disable-popup-blocking",
            "--disable-notifications"
        );

        driver = await new Builder()
            .forBrowser('chrome')
            .build();

        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        checkoutPage = new CheckoutPage(driver);
        screenshotPage = new ScreenshotPage(driver);

    });

    afterEach(async function () {

        await driver.quit();

    });

    it('should login successfully', async function () {

        await loginPage.open();

        await loginPage.enterUsername('standard_user');

        await loginPage.enterPassword('secret_sauce');

        await loginPage.clickLogin();

        const url = await driver.getCurrentUrl();

        assert.strictEqual(
            url,
            'https://www.saucedemo.com/inventory.html'
        );

        await screenshotPage.takeScreenshot('login-success');
    });

    it('should show error for invalid username', async function () {

        await loginPage.open();

        await loginPage.login(
            'invalid_user',
            'secret_sauce'
        );

        const errorMessage = await loginPage.getErrorMessage();

        assert.strictEqual(
            errorMessage,
            "Epic sadface: Username and password do not match any user in this service"
        );

        const url = await driver.getCurrentUrl();

        assert.strictEqual(
            url,
            'https://www.saucedemo.com/'
        );

        await screenshotPage.takeScreenshot('invalid-username');
    });

    it('should show error for wrong password', async function () {

        await loginPage.open();

        await loginPage.login(
            'standard_user',
            'wrong_password'
        );

        const errorMessage = await loginPage.getErrorMessage();

        assert.strictEqual(
            errorMessage,
            "Epic sadface: Username and password do not match any user in this service"
        );

        const url = await driver.getCurrentUrl();

        assert.strictEqual(
            url,
            'https://www.saucedemo.com/'
        );

        await screenshotPage.takeScreenshot('wrong-password');
    });

    it('should show error for locked out user', async function () {

        await loginPage.open();

        await loginPage.login(
            'locked_out_user',
            'secret_sauce'
        );

        const errorMessage = await loginPage.getErrorMessage();

        assert.strictEqual(
            errorMessage,
            "Epic sadface: Sorry, this user has been locked out."
        );

        const url = await driver.getCurrentUrl();

        assert.strictEqual(
            url,
            'https://www.saucedemo.com/'
        );

        await screenshotPage.takeScreenshot('locked-out-user');
    });

    it('should add product to cart', async function () {

        await loginPage.open();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await inventoryPage.waitInventoryLoaded();

        console.log(await driver.getCurrentUrl());

        console.log(await inventoryPage.getInventoryTitle());

        await inventoryPage.clickAddToCart();

        const badge = await inventoryPage.getCartBadge();

        assert.strictEqual(
            badge,
            "1"
        );

        await screenshotPage.takeScreenshot('add-cart');
    });

    it('should checkout successfully', async function () {

        console.log("1. Open");
        await loginPage.open();

        console.log("2. Login");
        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        console.log("3. Inventory");
        await inventoryPage.waitInventoryLoaded();

        console.log("4. Add Cart");
        await inventoryPage.clickAddToCart();

        console.log("5. Open Cart");
        await inventoryPage.openCart();

        assert.strictEqual(
            await driver.getCurrentUrl(),
            "https://www.saucedemo.com/cart.html"
        );

        console.log("6. Wait Cart");
        await checkoutPage.waitCartLoaded();

        console.log("7. Click Checkout");
        await checkoutPage.clickCheckout();

        assert.strictEqual(
            await driver.getCurrentUrl(),
            "https://www.saucedemo.com/checkout-step-one.html"
        );

        console.log("8. Fill Information");
        await checkoutPage.enterFirstName("Aghnia");
        await checkoutPage.enterLastName("Kamila");
        await checkoutPage.enterPostalCode("40123");

        console.log("9. Continue");
        await checkoutPage.clickContinue();

        assert.strictEqual(
            await driver.getCurrentUrl(),
            "https://www.saucedemo.com/checkout-step-two.html"
        );

        console.log("10. Finish");
        await checkoutPage.clickFinish();

        assert.strictEqual(
            await driver.getCurrentUrl(),
            "https://www.saucedemo.com/checkout-complete.html"
        );

        console.log("11. Verify Message");
        const message = await checkoutPage.getCompleteMessage();

        assert.strictEqual(
            message,
            "Thank you for your order!"
        );

        await screenshotPage.takeScreenshot("checkout");

    });

});