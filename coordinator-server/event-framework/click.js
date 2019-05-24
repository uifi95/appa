const Event = require("./event");

class Click extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        const element = await browser.$(this.eventDescriptor.selector);
        element.click();
    }
}

module.exports = Click;