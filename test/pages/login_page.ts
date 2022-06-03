const config = require('../../wdio.conf.ts');

class LoginPage {

    get username() { return $('#user_id'); }
    get password() { return $('#password'); }
    get submit() { return $('#entry-login'); }
    get privacyPopupButton() { return $('.privacyPolicyContainer').$('#agree_button'); }
    get courseBasePage() {return $('.base-courses-container'); }

    async closePrivacyPopup(timeout: number) {
        await this.privacyPopupButton.waitForExist();
        await this.privacyPopupButton.click();
        return this;
    }

    async loginWithCredentials(username: string, password: string) {
        try {
            await this.closePrivacyPopup(2000);
        } catch {}

        browser.waitUntil(
            async () => (await this.submit.isDisplayed()),
            {
                timeout: 5000,
                timeoutMsg: 'submit button did not load'
            }
        );

        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.submit.click();

        browser.waitUntil(
            async () => (await this.courseBasePage.isDisplayed()),
            {
                timeout: 5000,
                timeoutMsg: 'Courses base page did not load'
            }
        );

        let courseColumns = await $('#course-link-_6_1 > h4');

        await browser.waitUntil(
            async () => (await courseColumns.isDisplayed()),
            {
                timeout: 5000,
                timeoutMsg: 'Base Courses did not display'
            }
        );

        console.log("Login with Credentials completed")
        return this;
    }

}

export default new LoginPage();
