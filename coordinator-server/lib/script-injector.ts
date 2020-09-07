import { Browser } from "webdriverio";

import { injectScripts } from './inject-scripts';

export class ScriptInjector {
    private scriptInjectCheckInterval: number = 1000;

    constructor(private masterBrowser: Browser, private port: number) {
    }

    injectScriptsPeriodically() {
        const self = this;
        setTimeout(async function tick() {
            await self.masterBrowser.execute(injectScripts, self.port);
            setTimeout(tick, self.scriptInjectCheckInterval);
        }, self.scriptInjectCheckInterval);
    }
}
