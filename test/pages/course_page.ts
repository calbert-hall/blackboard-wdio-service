const config = require('../../wdio.conf.ts');

class CoursePage {
    get rosterLink() {return $('#course-outline-roster-link'); }
    get closeButton() {return $('.bb-close'); }

    async closePanel() {
        await this.closeButton.click();
    }
}

export default new CoursePage();
