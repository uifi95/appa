const { multiremote, remote } = require('webdriverio');
const EventDispatcher = require('../event-framework/event-dispatcher');
const ScriptInjector = require('./script-injector');

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

const initEventFramework = async ({ appUrl, master, slaves, port }) => {
    const { slaveConfig, masterConfig } = generateConfigs(master, slaves);
    const slaveBrowsers = await multiremote(slaveConfig);
    const eventDispatcher = new EventDispatcher(slaveBrowsers);
    await slaveBrowsers.url(appUrl);
    
    // start master and inject necessary scripts into it
    const masterBrowser = await remote(masterConfig);
    await masterBrowser.url(appUrl);

    new ScriptInjector(masterBrowser, port).injectScriptsPeriodically();

    return eventDispatcher;
};

module.exports = initEventFramework;