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

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/client.js', function(req, res){
    res.sendFile(__dirname + '/client.js');
});

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