const Click = require("./click");
const KeyPress = require("./keypress");
const Scroll = require("./scroll");
const MouseOver = require("./mouseover");
const BeforeUnload = require("./beforeunload");
const Resize = require("./resize");

class EventDispatcher {
    constructor(browser) {
        this.browser = browser;
        this.eventMap = {
            click: Click,
            keypress: KeyPress,
            scroll: Scroll,
            mouseover: MouseOver,
            beforeunload: BeforeUnload,
            resize: Resize
        };
    }

    async dispatch(event) {
        try {
            return await new this.eventMap[event.name](event).trigger(this.browser);
        } catch (err) {
            console.warn('Failed event dispatch', event, browser);
        }
    }
}

module.exports = EventDispatcher;