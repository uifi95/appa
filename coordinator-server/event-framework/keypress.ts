import { Browser } from "webdriverio";
import { Event } from "./event";

export class KeyPress extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser: Browser) {
        browser.keys([this.eventDescriptor.key]);
    }
}
