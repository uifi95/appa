const Click = require("./click");
const KeyPress = require("./keypress");
const Scroll = require("./scroll");

class EventDispatcher {
    constructor(browser) {
        this.browser = browser;
        this.eventMap = {
            click: Click,
            keypress: KeyPress,
            scroll: Scroll
        };
    }

    async dispatch(event) {
        return await new this.eventMap[event.name](event).trigger(this.browser);
    }
}

module.exports = EventDispatcher;