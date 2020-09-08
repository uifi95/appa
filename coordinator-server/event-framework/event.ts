import { Browser } from "webdriverio";

export class Event {

    constructor(protected eventDescriptor) {
    }

    async getElement(browser: Browser) {
        return browser.$(this.eventDescriptor.identifier)
    }

    async trigger(browser) {
        throw new Error('Not implemented');
    }
}
