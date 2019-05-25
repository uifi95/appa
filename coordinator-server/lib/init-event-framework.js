const { multiremote, remote } = require('webdriverio');
const EventDispatcher = require('../event-framework/event-dispatcher');
const injectScripts = require('./inject-scripts');

const generateConfigs = (master, slaves) => {
    const slaveConfig = {};
    slaves.forEach((slaveType) => {
        slaveConfig[`slave${slaveType}`] = { capabilities: {
                browserName: slaveType
            } 
        }
    });
    const masterConfig = {
        capabilities: {
            browserName: master
        }
    };
    return { slaveConfig, masterConfig };
};

const initEventFramework = async ({ appUrl, master, slaves }) => {
    const { slaveConfig, masterConfig } = generateConfigs(master, slaves);
    const slaveBrowsers = await multiremote(slaveConfig);
    const eventDispatcher = new EventDispatcher(slaveBrowsers);
    await slaveBrowsers.url(appUrl);
    const masterBrowser = await remote(masterConfig);

    // start master and inject necessary scripts into it
    await masterBrowser.url(appUrl);
    masterBrowser.execute(injectScripts);
    return eventDispatcher;
};

module.exports = initEventFramework;