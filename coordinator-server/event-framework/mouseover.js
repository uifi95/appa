const Event = require("./event");

class MouseOver extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        const element = await super.getElement(browser);
        // element.mouseover();

        const identifier = this.eventDescriptor.identifier;
        //element.moveTo(this.eventDescriptor.x, this.eventDescriptor.y);

        browser.execute(
            (identifier) => {
                //const element = super.getElement(browser); 
                const element = document.querySelector(identifier);
                //element.mouseover();
                element.dispatchEvent(new Event('mouseover'));



            },
            identifier
        );
    }
}

module.exports = MouseOver;