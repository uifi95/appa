import { Event } from "./event";

export class KeyPress extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        browser.keys([this.eventDescriptor.key]);
    }
}
