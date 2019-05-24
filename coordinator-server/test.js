const { multiremote } = require('webdriverio');
const EventDispatcher = require('./event-framework/event-dispatcher');
let browser = null;
let eventDispatcher = null;
(async () => {
    browser = await multiremote({
        // myChromeBrowser: {
        //     capabilities: {
        //         browserName: 'chrome'
        //     }
        // },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    });
    eventDispatcher = new EventDispatcher(browser);


    await browser.url('https://www.amazon.com/');

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

app.get('/', async function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    await eventDispatcher.dispatch('click', {
        selector: "#nav-cart"
    });

    // Send back a response and end the connection
    res.send('Hello World!\n');
});

io.on('connection', function(socket){
    socket.on('clientClick', function (evt) {
        console.log('Click received: ', evt);
    })
});

// Start the server on port 3000
http.listen(3000, '127.0.0.1');  
console.log('Node server running on port 3000');  