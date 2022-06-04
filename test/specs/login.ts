import LoginPage from '../pages/login_page';
import {Capabilities} from '@wdio/types';
import BaseNavPage from "../pages/base_page";
import CoursePage from "../pages/course_page";

//const { remote, browser } = require('webdriverio');
const config = require('../../wdio.conf.ts');
const { By, Target } = require('@applitools/eyes-webdriverio5-service');

describe('Ultra wdio', () => {

    beforeEach(async () => {
        await browser.url('https://lti-onedrive.blackboard.com');
    });

    afterEach(async () => {
        try {
        } 
        catch (e) {
        }
        
    });

    afterAll(async () => {
    });

    it('displays the login page', async () => {
        try {
            //Visual checkpoint #1
            await browser.eyesCheck('Login Page', Target.window());

            //Log in
            await LoginPage.loginWithCredentials('jaxinstr1', 'test');

            await browser.waitUntil(
                async () => (await BaseNavPage.logoutButton.isDisplayed()),
                {
                    timeout: 10000,
                    timeoutMsg: 'logout button did not display'
                }
            );

            await browser.eyesCheck('Landing page', Target.window());

            // //logout for next test
            await BaseNavPage.logout();
            await console.log("Test 1 complete");

        }
        catch (err) {
            console.log("Test 1 -- EXCEPTION ERROR: " + err);
        }
    });

    //Course view VR test
    it('displays the main course page', async () => {
        try {
            const detailsActions = By.className('course-outline__details-and-actions');
            const outline = By.className('js-content-outline')

            //Log in
            await LoginPage.loginWithCredentials('jaxinstr1', 'test');

            await browser.eyesCheck('Landing Page', Target.region(detailsActions));

            //Navigate and open course
            await BaseNavPage.navigateToBaseCourses();
            await BaseNavPage.openCourse();

            await browser.eyesCheck('Details & Actions', Target.region(detailsActions));
            // //Visual checkpoint of Course outline
            await browser.eyesCheck('Course content Outline', Target.region(outline));
            // Close course panel
            await CoursePage.closePanel();

            await BaseNavPage.logout();
            await console.log("Test 2 complete");
        }
        catch (err) {
            console.log("Test 2 EXCEPTION ERROR: " + err);
        }
    });

})
