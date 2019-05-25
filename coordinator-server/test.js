const { multiremote } = require('webdriverio');
const EventDispatcher = require('./event-framework/event-dispatcher');

// TODO this must come from config/CLI argument
let appUrl = 'https://clarity.design';

let master = null;
let browser = null;
let eventDispatcher = null;
(async () => {
    master = await multiremote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
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

// TODO make this code look better
// TODO this works for SPAs only, need a tool to inject scripts for MPAs. tampermonkey works (chrome extension)
injectScripts = function() {
    injectScript = (source, callback) => {
        var script = document.createElement('script');
        script.async = 1;
        script.src = source;
    
        script.onload = script.onreadystatechange = (_, isAbort) => {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                script = undefined;
                if (!isAbort && callback) callback();
            }
        };
        
        document.head.appendChild(script);
    };

    injectScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
        () => injectScript('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js',
            () => injectScript('https://cdnjs.cloudflare.com/ajax/libs/optimal-select/4.0.1/optimal-select.js',
                () => injectScript('http://localhost:3000/client.js', () => console.log('all scripts loaded')))));
}

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