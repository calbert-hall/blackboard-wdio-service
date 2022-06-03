import {Capabilities} from '@wdio/types';

const { remote } = require('webdriverio');
const config = require('../../wdio.conf.ts');
const { Eyes, Target, ConsoleLogHandler, By, BatchInfo } = require('@applitools/eyes.webdriverio')

const eyes = new Eyes()

    // Set your private API key.
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY)

// Allows you to gather your tests into separate groupings within the same file
describe('Student List view Filter Batch', function() {

//represents a single test case
it('SLV filtering should look ok', async function () {
    // Navigate Ultra to SLV page
    browser.url('https://ultra-next.bbpd.io/ultra/courses/_21_1/grades?gradebookView=list&listViewType=students')

    try {
        // Set browser to fullscreen
        browser.windowHandleFullscreen();

        // Set Batch Name and ID
        eyes.setBatch("Student List view", "Filtering")

        // Batch test FullName filter
        eyes.open(browser, 'SLV Filtering', 'FullName filter', viewportSize);

        browser.click('#fullname selector')

        // Visual check
        eyes.check('Check full name', Target.window());

        // End first batch test
        eyes.close();


        // Batch test Student ID filter
        eyes.open(browser, 'SLV Filtering', 'Student ID filter', viewportSize);

        browser.click('#studentID selector')

        // Visual check
        eyes.check('Check Student ID', Target.window());

        // End first batch test
        eyes.close();


        // Batch test Last Access filter
        eyes.open(browser, 'SLV Filtering', 'Last Access filter', viewportSize);

        browser.click('#LastAccess selector')

        // Visual check
        eyes.check('Check Last access date', Target.window());

        // End first batch test
        eyes.close();

    } finally {
        // If the test was aborted before eyes.close was called ends the test as aborted.
        await eyes.abothIFNotClosed();

    }
});
