const Event = require("./event");

class Scroll extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        const { identifier, position } = this.eventDescriptor;
        browser.execute(
            (identifier, position) => {
                const element = document.querySelector(identifier);
                element.scrollTop = position;
            }, 
            identifier,
            position
        );
    }
}

module.exports = Scroll;
