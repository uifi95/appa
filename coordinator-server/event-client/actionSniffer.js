const AllowedEvents = ['click', 'doubleclick', 'keyup', 'keydown', 'contextmenu', 'scroll', 'mouseover', 'resize'];
const DebounceEvents = ['scroll', 'mouseover', 'resize'];

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
        console.log('Not (Yet) Implemented!');
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

    mouseover(event) {
        const path = OptimalSelect.select(event.target);
        const rectangle = event.target.getBoundingClientRect();
        const size = {
            width: rectangle.right - rectangle.left,
            height: rectangle.bottom - rectangle.top
        };
        const position = {
            x: event.pageX - rectangle.left,
            y: event.pageY - rectangle.top
        };
        const obj = new MouseOverEvent(path, position, size);

        document.socket.emit('clientEvent', obj);
    },

    beforeunload: function (event) {

        // Send the last emit to close slaves
        const obj = new BeforeUnloadEvent();
        document.socket.emit('clientEvent', obj);

        // Disconnect the socket connection
        document.socket.close();

        return "The testing session will now end. Buh-Bye!";
    },

    resize: function (event) {
        var dimension = {
            height: window.outerHeight,
            width: window.outerWidth
        };
        const obj = new ResizeEvent(dimension);
        document.socket.emit('clientEvent', obj);
    }
};

class ActionSniffer {
    constructor(window) {
        this.eventListeners = [];
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
            var isDebounced = eventInfo.isDebounced;

            // create new function so that the variables have new scope.
            function register() {

                var handler = EventHandlers[eventName];
                var listener = function (event) {
                    handler.call(self, event);
                }

                console.log('added' + eventName);

                // let logger = (args) => console.log(`My args are ${args}`);
                // // throttle: call the logger at most once every two seconds
                // let throttledLogger = throttle(logger, 2000);
                if (isDebounced) {
                    window.addEventListener(eventName, this.debounce(listener, 30), capture);
                }
                else {
                    window.addEventListener(eventName, listener, capture);
                }

                this.eventListeners[eventName] = listener;
            }
            register.call(this);
        }
    }

    // TODO: see how and where it can(should) be used
    detach() {
        for (let eventKey in AllowedEvents) {
            var eventInfo = this.parseEventKey(eventKey);
            var eventName = eventInfo.eventName;

            window.removeEventListener(eventName, this.eventListeners[eventName], true);
        }

        this.eventListeners = [];
    }

    parseEventKey(eventKey) {
        var key = parseInt(eventKey, 0);
        if (AllowedEvents[key] != undefined) {
            let isDebounced = false;
            if (DebounceEvents[key] != undefined){
                isDebounced = true;
            }
            
            return {
                eventName: AllowedEvents[key],
                capture: true,
                isDebounced
            };
        } else {
            return {
                eventName: eventKey,
                capture: false
            };
        }
    }

    debounce(f, t) {
        return function (args) {
            let previousCall = this.lastCall;
            this.lastCall = Date.now();
            if (previousCall && ((this.lastCall - previousCall) <= t)) {
                clearTimeout(this.lastCallTimer);
            }
            this.lastCallTimer = setTimeout(() => f(args), t);
        }
    }

    throttle(f, t) {
        return function (args) {
            let previousCall = this.lastCall;
            this.lastCall = Date.now();
            if (previousCall === undefined || (this.lastCall - previousCall) > t) {
                f(args);
            }
        }
    }
}
