class Event {
    constructor(eventDescriptor) {
        this.eventDescriptor = eventDescriptor;
    }

    async getElement(browser) {
        return browser.$(this.eventDescriptor.identifier)
    }

    async trigger(browser) {
        throw new Error('Not implemented');
    }
}

module.exports = Event;