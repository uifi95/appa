const Event = require("./event");

class KeyPress extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        browser.keys([this.eventDescriptor.key]);
    }
}

module.exports = KeyPress;