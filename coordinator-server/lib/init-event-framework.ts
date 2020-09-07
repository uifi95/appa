import { multiremote, remote } from 'webdriverio';
import { EventDispatcher } from '../event-framework/event-dispatcher';
import { ScriptInjector } from './script-injector';
import { browsersConfig } from '../config/browsersConfigs.config';

const generateConfigs = (master: string, slaves: Array<string>, logLevel: string) => {
    const slaveConfig: { [key: string]: any } = {};
    slaves.forEach((slaveType) => {
        slaveConfig[`slave${slaveType}`] = browsersConfig[slaveType];
    });

    const masterConfig = browsersConfig[master];
    masterConfig.logLevel = logLevel;
    return { slaveConfig, masterConfig };
};

export const initEventFramework = async ({
    appUrl,
    master,
    slaves,
    port,
    logLevel,
}: any) => {
    const { slaveConfig, masterConfig } = generateConfigs(
        master,
        slaves,
        logLevel
    );
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
