const Click = require("./click");
const KeyPress = require("./keypress");
const Scroll = require("./scroll");
const BeforeUnload = require("./beforeunload");

class EventDispatcher {
    constructor(browser) {
        this.browser = browser;
        this.eventMap = {
            click: Click,
            keypress: KeyPress,
            scroll: Scroll,
            beforeunload: BeforeUnload
        };
    }

    async dispatch(event) {
        return await new this.eventMap[event.name](event).trigger(this.browser);
    }
}

module.exports = EventDispatcher;