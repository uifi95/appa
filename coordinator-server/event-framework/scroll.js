const Event = require("./event");

class Scroll extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        browser.execute(
            (ident, position) => {
                document.querySelector(ident).scrollTop = position;
            }, 
            this.eventDescriptor.identifier, 
            this.eventDescriptor.position
        );
    }
}

module.exports = Scroll;
