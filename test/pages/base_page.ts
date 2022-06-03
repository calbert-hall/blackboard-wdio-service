import {Capabilities} from '@wdio/types';

const { remote } = require('webdriverio');

const config = require('../../wdio.conf.ts');

class BaseNavPage {

    get logoutButton() { return $('a[ui-sref="logout"]'); }
    get navCourses() {return $('[ui-sref="base.courses"]'); }
    get baseCourses() {return $('.base-courses-container'); }
    get courseCard() {return $('.course-title[id="course-link-_6_1"]'); }
    get rosterLink() {return $('#course-outline-roster-link'); }

    async navigateToBaseCourses() {
        await this.navCourses.click();

        await browser.waitUntil(
            async () => (await this.baseCourses.isDisplayed()),
            {
                timeout: 10000,
                timeoutMsg: 'Base Courses did not display'
            }
        );
        return this;
    }

    async openCourse() {
        await this.courseCard.click();

        await browser.waitUntil(
            async () => (await this.rosterLink.isDisplayed()), 
            {
                timeout: 10000,
                timeoutMsg: 'course card did not display' 
            }
        );
        return this;
    }

    async logout() {

        await this.logoutButton.click();
        return this;
    }
}

export default new BaseNavPage();
