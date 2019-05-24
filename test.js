const { multiremote } = require('webdriverio');

let browser = null;
(async () => {
    browser = await multiremote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    });

    await browser.url('http://www.google.com');

    const title = await browser.getTitle();
    console.log('Title was: ' + title);
})().catch((e) => console.error(e));

const http = require('http');



// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {  
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    browser.url('http://www.amazon.com');

    // Send back a response and end the connection
    res.end('Hello World!\n');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');  
console.log('Node server running on port 3000');  