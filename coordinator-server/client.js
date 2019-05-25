var AllowedEvents = ['click', 'doubleclick', 'keypress', 'contextmenu'];
var EventHandlers = {
    click: function (event) {
        var path = OptimalSelect.select(event.target);
        var obj = new FormalEvent("click", path, event.x, event.y);
        
        document.socket.emit('clientEvent', obj);

        console.log('handler click');
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
        var checkWebkitandIE = (e.which == 26 ? 1 : 0);
        var checkMoz = (e.which == 122 && e.ctrlKey ? 1 : 0);

        if (checkWebkitandIE || checkMoz) {
            $("body").append("<p>ctrl+z detected!</p>");
        } 

         var obj = new FormalEvent("keypress", e.which, event.x, event.y);

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
    constructor(name, identifier, x, y) {
        this.name = name;
        this.identifier = identifier;
        this.x = x;
        this.y = y;
    }
}


