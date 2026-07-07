import { expect } from '@wdio/globals'
import { HomeAction } from '../actions/home.action'
import loginAction from '../actions/login.action'
import appHelper from '../../utils/app.helper'

describe('Home Page', () => {

    const homeAction = new HomeAction()

    before(async () => {
        await appHelper.launch()

        await loginAction.login(
            'standard_user',
            'secret_sauce'
        )
    })

    after(async () => {
        await appHelper.close()
    })

    it('verify homepage, scroll, sorting and logout', async () => {

        await expect(await homeAction.verifyHomePage()).toBe(true)

        await homeAction.scroll('down')
        await homeAction.scroll('up')

        await homeAction.sortByNameAZ()

        await homeAction.sortByNameZA()

        await homeAction.sortByPriceLowHigh()

        await homeAction.sortByPriceHighLow()

        await homeAction.tapModalSelectorButton()
        await homeAction.tapCloseFilterButton()

        await homeAction.tapBurgerMenuButton()
        await homeAction.tapLogoutButton()

        await expect(await loginAction.isOnLoginPage()).toBe(true)

    })

})