import { Event } from "./event";

export class Resize extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        browser.setWindowSize(
            this.eventDescriptor.dimension.width,
            this.eventDescriptor.dimension.height);
    }
}
