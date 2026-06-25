const { Builder, By, until } = require('selenium-webdriver')
const assert = require('assert');

describe('Sauce Demo Test', function(){
     let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com');
    });

    afterEach(async function () {
        await driver.quit();
    });


    it ('Sukses Login', async function(){

        await driver.get('https://www.saucedemo.com');

        await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
        await driver.findElement(By.css('[data-test="password"]')).sendKeys('secret_sauce');

        await driver.findElement(By.css('[data-test="login-button"]')).click();

        let appLogo = await driver.wait(
            until.elementLocated(By.className('app_logo')),
            10000
        );
        let logoText = await appLogo.getText();

        assert.strictEqual(logoText, 'Swag Labs');

        console.log('Login berhasil');

        await driver.sleep(2000);

    });
    it('Urutkan Produk dari A-Z', async function () {

        await driver.get('https://www.saucedemo.com');

        await driver.findElement(By.css('[data-test="username"]'))
            .sendKeys('standard_user');

        await driver.findElement(By.css('[data-test="password"]'))
            .sendKeys('secret_sauce');

        await driver.findElement(By.css('[data-test="login-button"]'))
            .click();

        await driver.wait(
            until.elementLocated(By.className('app_logo')),
            10000
        );    

        let sortDropdown = await driver.findElement(
            By.css('[data-test="product-sort-container"]')
        );

        await sortDropdown.click();

        await sortDropdown.findElement(
            By.css('option[value="az"]')
        ).click();

        let firstProduct = await driver.findElement(
            By.css('.inventory_item_name')
        );

        let firstProductName = await firstProduct.getText();

        assert.strictEqual(
            firstProductName,
            'Sauce Labs Backpack'
        );

        console.log('Sort A-Z berhasil');

        await driver.sleep(2000);
    });
})