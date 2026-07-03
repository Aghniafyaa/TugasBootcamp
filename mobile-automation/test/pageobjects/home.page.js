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