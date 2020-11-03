import { Browser } from "webdriverio";

export class Event {
    public name: string;
    
    constructor(protected eventDescriptor) {
    }

    async getElement(browser: Browser) {
        return browser.$(this.eventDescriptor.identifier)
    }

    async trigger(browser: Browser) {
        throw new Error('Not implemented');
    }
}
