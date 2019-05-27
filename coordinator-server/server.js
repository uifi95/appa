const initEventFramework = require('./lib/init-event-framework');

// TODO this must come from config/CLI argument
const config = require("./appa.config.json");
const eventFrameworkConfig = {
    appUrl: config.url,
    master: config.masterBrowser,
    slaves: config.slaveBrowsers
};

let eventDispatcher = null;
initEventFramework(eventFrameworkConfig)
    .then((dispatcher) => eventDispatcher = dispatcher)
    .catch((e) => console.error(e));

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start client js loading

app.get('/events.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/event-client/event-definitions.js'));
});

app.get('/action.sniffer.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/event-client/actionSniffer.js'));
});

app.get('/client.js', function(req, res){
    res.sendFile(path.join(__dirname, '/event-client/client.js'));
});

// End cliend js loading

// Start the server on port 3000
http.listen(3000, 'localhost');
console.log('Node server running on port 3000');


io.on('connection', function(socket) {
    socket.on('clientEvent', (event) => {
        if (!eventDispatcher) {
            console.log("Event Dispatcher not initialized yet, go back");
            return;
        }
        console.log(event);
        eventDispatcher.dispatch(event)
    });
});  