const { multiremote, remote } = require('webdriverio');
const EventDispatcher = require('../event-framework/event-dispatcher');
const injectScripts = require('./inject-scripts');

const initEventFramework = async (appUrl) => {
    const slaves = await multiremote({
        myEdgeBrowser: {
            capabilities: {
                browserName: 'MicrosoftEdge'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    });
    const eventDispatcher = new EventDispatcher(slaves);
    await slaves.url(appUrl);
    const master = await remote({
        capabilities: {
            browserName: 'chrome'
        }
    });

    // start master and inject necessary scripts into it
    await master.url(appUrl);
    master.execute(injectScripts);
    return eventDispatcher;
};

module.exports = initEventFramework;