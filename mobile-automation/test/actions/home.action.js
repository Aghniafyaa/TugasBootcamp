import { HomePage } from '../pageobjects/home.page';

export class HomeAction {
    constructor() {
        this.homePage = new HomePage();
    }

    async verifyHomePage() {

        const burgerMenu = await $(this.homePage.burgerMenuButton)

        const cartButton = await $(this.homePage.cartButton)

        await burgerMenu.waitForDisplayed()

        await cartButton.waitForDisplayed()

        return (
            await burgerMenu.isDisplayed() &&
            await cartButton.isDisplayed()
        )

    }

    // async tapFilterButton() {
    //     const element = await $(this.homePage.filterButton);
    //     await element.waitForDisplayed();
    //     await element.click();
    // }

    async tapCartButton() {
        const element = await $(this.homePage.cartButton);
        await element.waitForDisplayed();
        await element.click();
    }

    async scroll(direction = 'down') {
        const { height, width } = await driver.getWindowSize();
        const startY = direction === 'down' ? height * 0.8 : height * 0.2;
        const endY = direction === 'down' ? height * 0.2 : height * 0.8;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'pointer1',
                actions: [
                    { type: 'pointerMove', x: width / 2, y: startY, duration: 100 },
                    { type: 'pointerDown', duration: 100 },
                    { type: 'pointerMove', x: width / 2, y: endY, duration: 500 },
                    { type: 'pointerUp', duration: 100 }
                ]
            }
        ]);
    }

    async scrollToElement(selector, maxSwipes = 10) {
        for (let i = 0; i < maxSwipes; i++) {
            const element = await $(selector);
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) return true;

            await this.scroll('up');
        }
        return false;
    }

    async tapModalSelectorButton() {
        const element = await $(this.homePage.modalSelectorButton);
        await element.waitForDisplayed();
        await element.click();
    }

    async sortByNameAZ() {
        await this.tapModalSelectorButton();

        const element = await $(this.homePage.sortNameAZ);
        await element.waitForDisplayed();
        await element.click();
    }

    async sortByNameZA() {
        await this.tapModalSelectorButton();

        const element = await $(this.homePage.sortNameZA);
        await element.waitForDisplayed();
        await element.click();
    }

    async sortByPriceLowHigh() {
        await this.tapModalSelectorButton();

        const element = await $(this.homePage.sortPriceLowHigh);
        await element.waitForDisplayed();
        await element.click();
    }

    async sortByPriceHighLow() {
        await this.tapModalSelectorButton();

        const element = await $(this.homePage.sortPriceHighLow);
        await element.waitForDisplayed();
        await element.click();
    }

    async tapCloseFilterButton() {
        const element = await $(this.homePage.closeFilterButton);
        await element.waitForDisplayed();
        await element.click();
    }

    async tapBurgerMenuButton() {
        const element = await $(this.homePage.burgerMenuButton);
        await element.waitForDisplayed();
        await element.click();
    }

    async tapLogoutButton() {
        const element = await $(this.homePage.logoutButton);
        await element.waitForDisplayed();
        await element.click();
    }
}

export default new HomeAction();