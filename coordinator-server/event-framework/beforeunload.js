const Event = require("./event");

class BeforeUnload extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        await browser.closeWindow();
    }
}

module.exports = BeforeUnload;