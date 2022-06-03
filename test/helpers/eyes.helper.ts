import {Capabilities} from '@wdio/types';

const config = require('../../wdio.conf.ts');
const {Eyes, Target, ConsoleLogHandler, ClassicRunner, StitchMode, RectangleSize, BatchInfo, Configuration} = require('@applitools/eyes-webdriverio');

//This is an example of another way we could implement the eyes check within specs. This is similar to how the Mobile team will do there's.
class EyesHelper {

    static verifyEye(value) {
        let runner = new ClassicRunner();
        const eyes = new Eyes();
        eyes.setLogHandler(new ConsoleLogHandler(true));
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        eyes.setBatch({
            id: 'batchID',
            name: value
        });
        eyes.setStitchMode(StitchMode.CSS);
        eyes.setViewportSize( new RectangleSize(1920, 1080));

        browser.call(() => eyes.open(driver, "Ultra Web app", value));
        console.log("*******************EYES OPENED***********")
        browser.call(() => eyes.check('home page', Target.window().fully()));
        console.log("*************************EYES CHECK*******************");
        browser.call(() => eyes.close());
        console.log("************************** EYES CLoSE*******************");
    }
}

export default new EyesHelper();
