const {By} = require('selenium-webdriver');

const INVENTORY_LOCATORS = {
    selectors: {
        addToCartButton: {
            type: 'id',
            value: 'add-to-cart-sauce-labs-backpack'
        },

        shoppingCartBadge: {
            type: 'className',
            value: 'shopping_cart_badge'
        },

        shoppingCartLink: {
            type: 'className',
            value: 'shopping_cart_link'
        },

        inventoryTitle: {
            type: 'className',
            value: 'title'
        }
    }
};

module.exports = INVENTORY_LOCATORS;