const injectScripts = require('./inject-scripts');

class ScriptInjector {
    constructor(masterBrowser, port) {
        this.scriptInjectCheckInterval = 100; // milliseconds
        this.masterBrowser = masterBrowser;
        this.port = port;
    }

    injectScriptsPeriodically() {
        const self = this;
        setTimeout(function tick() {
            self.masterBrowser.execute(injectScripts, self.port);
            setTimeout(tick, self.scriptInjectCheckInterval);
        }, self.scriptInjectCheckInterval);
    }
}

module.exports = ScriptInjector;