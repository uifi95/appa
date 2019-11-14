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

        this.dispatchQueue = [];
    }

    async ExecQueue() {
        if (this.dispatchQueue && this.dispatchQueue.length > 0) {
            var ev = this.dispatchQueue.shift();
            if (ev) {
                await ev.trigger(this.browser);
            }
        }
        else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        this.ExecQueue();
    }

    async dispatch(event) {
        console.error('event dispatch', event);
        try {
            this.dispatchQueue.push(new this.eventMap[event.name](event));
            //return await new this.eventMap[event.name](event).trigger(this.browser);
        } catch (err) {
            console.error('Failed event dispatch', event);
        }
    }
}

module.exports = EventDispatcher;