const { multiremote, remote } = require('webdriverio');
const EventDispatcher = require('../event-framework/event-dispatcher');
const ScriptInjector = require('./script-injector');
const browsersConfig = require('../config/browsersConfigs.conf').browsersConfig

const generateConfigs = (master, slaves, logLevel) => {
    const slaveConfig = {};
    slaves.forEach((slaveType) => {
        slaveConfig[`slave${slaveType}`] = browsersConfig[slaveType];
    });

    const masterConfig = browsersConfig[master];
    masterConfig.logLevel = logLevel
    return { slaveConfig, masterConfig };
};

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