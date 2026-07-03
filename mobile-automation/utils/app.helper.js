class AppHelper {

    packageName = 'com.swaglabsmobileapp'

    async launch() {
        await driver.activateApp(this.packageName)
    }

    async close() {
        await driver.terminateApp(this.packageName)
    }

    async reset() {
        await driver.execute('mobile: clearApp', {
            appId: this.packageName
        })
    }

}

export default new AppHelper()