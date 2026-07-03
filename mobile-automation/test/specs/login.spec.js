import { expect } from '@wdio/globals'
import loginAction from '../actions/login.action'
import appHelper from '../../utils/app.helper'
import credentials from '../test_data/credentials'

describe('Swag Labs App', () => {
    beforeEach(async () => {
        await appHelper.launch()
    })

    afterEach(async function() {
        if (this.currentTest?.state === "failed") {
            await driver.takeScreenshot()
            await driver.saveScreenshot(`./reports/screenshots/${this.currentTest.title}.png`)
        }
    })

    after(async () => {
        await appHelper.close()
    })

    it('should login successfully with standard user', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        await loginAction.login(credentials.standard_user.username, credentials.standard_user.password)
        const isProductsVisible = await loginAction.waitForProducts()
        await expect(isProductsVisible).toBe(true)
    })
})