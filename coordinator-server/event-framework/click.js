const Event = require("./event");

class Click extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        const element = await super.getElement(browser);
        element.click();
    }
}

module.exports = Click;