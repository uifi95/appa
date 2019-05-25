const Click = require("./click");

class EventDispatcher {
    constructor(browser) {
        this.browser = browser;
        this.eventMap = {
            click: Click 
        };
    }

    async dispatch(event) {
        return await new this.eventMap[event.name](event).trigger(this.browser);
    }
}

module.exports = EventDispatcher;