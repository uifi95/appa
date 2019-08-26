const AllowedEvents = ['click', 'doubleclick', 'keyup', 'keydown', 'contextmenu', 'scroll', 'beforeunload'];
const EventHandlers = {
    click: function (event) {
        const path = OptimalSelect.select(event.target);
        const obj = new ClickEvent(path, event.x, event.y);

        document.socket.emit('clientEvent', obj);
    },

    doubleclick: function (event) {
        console.log('handler doubleclick');
    },

    scroll: function (event) {
        const path = OptimalSelect.select(event.target);
        const obj = new ScrollEvent(path, event.srcElement.scrollTop);

        document.socket.emit('clientEvent', obj);
    },

    contextmenu: function (event) {
        console.log('handler contextmenu');
    },

    keyup: function (event) {
        const obj = new KeyPressEvent(event.key, event.charCode);
        document.socket.emit('clientEvent', obj);
    },

    keydown(event) {
        if (!["Control", "Shift", "Alt"].includes(event.key)) {
            return;
        }
        const obj = new KeyPressEvent(event.key, event.charCode);
        document.socket.emit('clientEvent', obj);
    },

    beforeunload: function (event) {
        const obj = new BeforeUnloadEvent();
        document.socket.emit('clientEvent', obj);

        return "The testing session will now end. Buh-Bye!";
    }
};

class ActionSniffer {
    constructor(window) {
        this.events = [];
    }

    attach() {
        if (this.attached) {
            return;
        }
        this.attached = true;
        this.eventListeners = {};
        var self = this;
        for (let eventKey in AllowedEvents) {
            var eventInfo = this.parseEventKey(eventKey);
            var eventName = eventInfo.eventName;
            var capture = eventInfo.capture;
            // create new function so that the variables have new scope.
            function register() {

                var handler = EventHandlers[eventName];
                var listener = function (event) {
                    handler.call(self, event);
                }

                console.log('added' + eventName);
                window.addEventListener(eventName, listener, capture);

                this.eventListeners[eventName] = listener;
            }
            register.call(this);
        }
    }

    detach() {
        //TODO :)
    }

    parseEventKey(eventKey) {
        var key = parseInt(eventKey, 0);
        if (AllowedEvents[key] != undefined) {
            return {
                eventName: AllowedEvents[key],
                capture: true
            };
        } else {
            return {
                eventName: eventKey,
                capture: false
            };
        }
    }
}