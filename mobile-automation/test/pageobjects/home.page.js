export class HomePage {
    get filterButton() {
        return 'android=new UiSelector().description("test-Menu")'
    }

    get cartButton() {
        return 'android=new UiSelector().description("test-ADD TO CART").instance(0)'
    }

    get modalSelectorButton() {
        return 'android=new UiSelector().description("test-Modal Selector Button")'
    }

    get sortNameAZ() {
        return 'android=new UiSelector().text("Name (A to Z)")'
    }

    get sortNameZA() {
        return 'android=new UiSelector().text("Name (Z to A)")'
    }

    get sortPriceLowHigh() {
        return 'android=new UiSelector().text("Price (low to high)")'
    }

    get sortPriceHighLow() {
        return 'android=new UiSelector().text("Price (high to low)")'
    }

    get closeFilterButton() {
        return 'android=new UiSelector().text("Cancel")'
    }

    get burgerMenuButton() {
        return 'android=new UiSelector().description("test-Menu")'
    }

    get logoutButton() {
        return 'android=new UiSelector().text("LOGOUT")'
    }
}