const { multiremote, remote } = require('webdriverio');
const EventDispatcher = require('../event-framework/event-dispatcher');
const ScriptInjector = require('./script-injector');

const generateConfigs = (master, slaves, logLevel) => {
    const slaveConfig = {};
    slaves.forEach((slaveType) => {
        slaveConfig[`slave${slaveType}`] = getBrowserConfig(slaveType);
    });

    const masterConfig = getBrowserConfig(master);
    return { slaveConfig, masterConfig };
};

const getBrowserConfig = (browser) => {
    switch (browser) {
        case 'chrome': {
            configBrowser = require('../config/chrome.conf').config;
            return configBrowser
        }
        case 'firefox': {
            configBrowser = require('../config/firefox.conf').config;
            return configBrowser
        }
        case 'internet explorer': {
            configBrowser = require('../config/internetExplorer.conf').config;
            return configBrowser
        }
        default: {
            throw ("Config not detected for brower: " + browser)
        }
    }
}

const initEventFramework = async ({ appUrl, master, slaves, port, logLevel }) => {
    const { slaveConfig, masterConfig } = generateConfigs(master, slaves, logLevel);
    const slaveBrowsers = await multiremote(slaveConfig);
    const eventDispatcher = new EventDispatcher(slaveBrowsers);
    await slaveBrowsers.url(appUrl);
    
    // start master and inject necessary scripts into it
    const masterBrowser = await remote(masterConfig);
    await masterBrowser.url(appUrl);

    new ScriptInjector(masterBrowser, port).injectScriptsPeriodically();
    
    // Start the recursive function
    eventDispatcher.ExecQueue();
    return eventDispatcher;
};

module.exports = initEventFramework;