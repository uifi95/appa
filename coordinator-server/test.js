const { multiremote, remote } = require('webdriverio');
const EventDispatcher = require('./event-framework/event-dispatcher');
const injectScripts = require('./lib/inject-scripts');
// TODO this must come from config/CLI argument
let appUrl = 'https://clarity.design';

let master = null;
let browser = null;
let eventDispatcher = null;
(async () => {
    master = await remote({
        capabilities: {
            browserName: 'chrome'
        }
    });

    browser = await multiremote({
        myEdgeBrowser: {
            capabilities: {
                browserName: 'MicrosoftEdge'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    });
    eventDispatcher = new EventDispatcher(browser);

    await browser.url(appUrl);

    // start master and inject necessary scripts into it
    await master.url(appUrl);
    master.execute(injectScripts);

    const title = await browser.getTitle();
    console.log('Title was: ' + title);
})().catch((e) => console.error(e));

var app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/client.js', function(req, res){
    res.sendFile(__dirname + '/client.js');
});

io.on('connection', function(socket){
    console.log('');
    socket.on('clientEvent', function (evt) {
        eventDispatcher.dispatch(evt.name, { selector: evt.identifier });
    })
});

// Start the server on port 3000
http.listen(3000, 'localhost');  
console.log('Node server running on port 3000');  