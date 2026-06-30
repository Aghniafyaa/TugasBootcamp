const { By, until } = require('selenium-webdriver');
const INVENTORY_LOCATORS = require('../locators/inventoryPageLocator');

class InventoryPage {

    constructor(driver){
        this.driver = driver;
    }

    async waitInventoryLoaded() {
        await this.driver.wait(
            until.elementLocated(By.className('title')),
            5000
        );
    }

    async clickAddToCart(){

        await this.driver.findElement(
            By.id(INVENTORY_LOCATORS.selectors.addToCartButton.value)
        ).click();

    }

    async getCartBadge(){

        return await this.driver.findElement(
            By.className(INVENTORY_LOCATORS.selectors.shoppingCartBadge.value)
        ).getText();

    }

    async openCart(){

        await this.driver.findElement(
            By.className(INVENTORY_LOCATORS.selectors.shoppingCartLink.value)
        ).click();

    }

    async getInventoryTitle(){

        return await this.driver.findElement(
            By.className(INVENTORY_LOCATORS.selectors.inventoryTitle.value)
        ).getText();

    }

}

module.exports = InventoryPage;