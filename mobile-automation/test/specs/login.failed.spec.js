import { expect } from '@wdio/globals'
import loginAction from '../actions/login.action'
import appHelper from '../../utils/app.helper'
import credentials from '../test_data/credentials'

describe('login failed', () => {
    beforeEach(async () => {
        await appHelper.launch()
    })

    afterEach(async function () {
        if (this.currentTest?.state === "failed") {
            await driver.takeScreenshot()
            await driver.saveScreenshot(`./reports/screenshots/${this.currentTest.title}.png`)
        }
    })

    after(async () => {
        await appHelper.close()
    })

    it('should show error with invalid credentials', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)

        await loginAction.login(
            credentials.wrong_user.username,
            credentials.wrong_user.password
        )

        const isErrorVisible = await loginAction.isErrorDisplayed()
        await expect(isErrorVisible).toBe(true)
    })
})