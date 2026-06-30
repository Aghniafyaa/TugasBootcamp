const {By} = require('selenium-webdriver');

const CHECKOUT_LOCATORS = {
    url: 'https://www.saucedemo.com/cart.html',
    selectors: {

        checkoutButton: {
            type: 'id',
            value: 'checkout'
        },

        firstNameInput: {
            type: 'id',
            value: 'first-name'
        },

        lastNameInput: {
            type: 'id',
            value: 'last-name'
        },

        postalCodeInput: {
            type: 'id',
            value: 'postal-code'
        },

        continueButton: {
            type: 'id',
            value: 'continue'
        },

        finishButton: {
            type: 'id',
            value: 'finish'
        },

        completeHeader: {
            type: 'className',
            value: 'complete-header'
        }

    }
};

module.exports = CHECKOUT_LOCATORS;