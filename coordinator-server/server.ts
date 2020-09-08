import { initEventFramework } from './lib/init-event-framework';
import * as fs from 'fs';
import express from 'express';
import { Server } from 'http';
import SocketIO from 'socket.io';
import path from 'path';
const app = express();

const http = new Server(app);
const io = SocketIO(http);

// TODO this must come from config/CLI argument
const config = require("./config/appa.config.json");
const eventFrameworkConfig = {
    appUrl: config.url,
    master: config.masterBrowser,
    slaves: config.slaveBrowsers,
    port: config.port || 3000,
    logLevel: config.logLevel || 'trace'
};

let eventDispatcher = null;
initEventFramework(eventFrameworkConfig)
    .then((dispatcher) => eventDispatcher = dispatcher)
    .catch((e) => console.error(e));

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start client js loading

app.get('/events.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/event-client/event-definitions.js'));
});

app.get('/action.sniffer.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/event-client/actionSniffer.js'));
});

app.get('/client.js', function (req, res) {
    // TODO this is ugly as fuck.. need a build script/gulp/webpack something to replace the placeholder with the port from the config
    const client = fs.readFileSync(path.join(__dirname, '/event-client/client.js'), 'utf8');
    res.send(client.replace(`{{PORT_NUMBER}}`, config.port));
});

// End cliend js loading

// Start the server on the configured port
http.listen(config.port, 'localhost');
console.log(`Node server running on port ${config.port}`);


io.on('connection', function (socket) {
    socket.on('clientEvent', (event) => {
        if (!eventDispatcher) {
            console.log('Event Dispatcher not initialized yet, go back');
            return;
        }
        console.log(event);
        eventDispatcher.dispatch(event);
    });
});  