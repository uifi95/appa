const { remote } = require('webdriverio');

(async () => {
    const browser = await remote({
        logLevel: 'error',
        path: '/',
        capabilities: {
            browserName: 'firefox'
        }
    });

    await browser.url('http://www.google.com');

    const title = await browser.getTitle();
    console.log('Title was: ' + title);
})().catch((e) => console.error(e));