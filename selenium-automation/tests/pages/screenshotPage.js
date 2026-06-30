const fs = require('fs');
const path = require('path');

class ScreenshotPage {

    constructor(driver){
        this.driver = driver;
    }

    async takeScreenshot(fileName){

        const image = await this.driver.takeScreenshot();

        const folder = path.join(__dirname, '../../screenshot');

        if(!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }

        fs.writeFileSync(
            path.join(folder, `${fileName}.png`),
            image,
            'base64'
        );
    }

}

module.exports = ScreenshotPage;