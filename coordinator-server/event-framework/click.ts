import { Event } from "./event";

export class Click extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        const element = await super.getElement(browser);
        element.click();
    }
}
