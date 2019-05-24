class Event {
    constructor(eventDescriptor) {
        this.eventDescriptor = eventDescriptor;
    }

    async trigger() {
        throw new Error('Not implemented');
    }
}

module.exports = Event;