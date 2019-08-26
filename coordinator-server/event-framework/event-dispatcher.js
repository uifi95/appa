const Click = require("./click");
const KeyPress = require("./keypress");
const Scroll = require("./scroll");
const MouseOver = require("./mouseover");

class EventDispatcher {
    constructor(browser) {
        this.browser = browser;
        this.eventMap = {
            click: Click,
            keypress: KeyPress,
            scroll: Scroll,
            mouseover: MouseOver
        };
    }

    async dispatch(event) {
        return await new this.eventMap[event.name](event).trigger(this.browser);
    }
}

module.exports = EventDispatcher;