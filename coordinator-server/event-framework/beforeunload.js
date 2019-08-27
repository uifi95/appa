const Event = require("./event");

class BeforeUnload extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        await browser.closeWindow();

        // Force exit - of the node process
        // TODO - find a better solution
        process.exit(1);
    }
}

module.exports = BeforeUnload;