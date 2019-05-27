var AllowedEvents = ['click', 'doubleclick', 'keypress', 'contextmenu'];
var EventHandlers = {
    click: function (event) {
        var path = OptimalSelect.select(event.target);
        var obj = new ClickEvent(path, event.x, event.y);
        
        document.socket.emit('clientEvent', obj);
    },

    doubleclick: function (event) {
        console.log('handler doubleclick');
    },

    scroll: function (event) {
        console.log('handler scroll');
    },

    contextmenu: function (event) {
        console.log('handler contextmenu');
    },

    keypress: function (event) {
         var obj = new KeyPressEvent(event.key, event.charCode);
         document.socket.emit('clientEvent', obj);
    }
};

$(document).ready(function () {
    console.log("ready!");

    document.sniffer = new ActionSniffer();
    document.sniffer.attach();

    document.socket = io("http://localhost:3000");
});

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
                eventName: AllowedEvents[key], capture: true
            };
        } else {
            return {
                eventName: eventKey, capture: false
            };
        }
    }
}

class FormalEvent {
    constructor(name) {
        this.name = name;
    }
}

class ClickEvent extends FormalEvent {
    constructor(identifier, x, y) {
        super("click");
        this.identifier = identifier;
        this.x = x;
        this.y = y;
    }
}

class KeyPressEvent extends FormalEvent {
    constructor(key, code) {
        super("keypress");
        this.key = key;
        this.code = code;
    }
}


