const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

function compareImages(baseline, actual, diff){

    const img1 = PNG.sync.read(fs.readFileSync(baseline));
    const img2 = PNG.sync.read(fs.readFileSync(actual));

    const {width,height} = img1;

    const output = new PNG({
        width,
        height
    });

    const mismatch = pixelmatch(
        img1.data,
        img2.data,
        output.data,
        width,
        height,
        {
            threshold:0.1
        }
    );

    fs.writeFileSync(
        diff,
        PNG.sync.write(output)
    );

    return mismatch;
}

module.exports = compareImages;