import { Event } from "./event";

export class Scroll extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        const { identifier, position } = this.eventDescriptor;
        await browser.execute(
            function scroll(identifier, position) {
                const element = document.querySelector(identifier);
                if (element) {
                    element.scrollTop = position;
                } else {
                    // just scroll the entire document to the given position if we can't find the element
                    window.scrollTo(0, position);
                }
            },
            identifier,
            position
        );
    }
}

