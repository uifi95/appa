const Click = require("./click");

class EventDispatcher {
    constructor(browser) {
        this.browser = browser;
        this.eventMap = {
            click: Click 
        };
    }

    async dispatch(type, eventDescriptor) {
        return await new this.eventMap[type](eventDescriptor).trigger(this.browser);
    }
}

module.exports = EventDispatcher;