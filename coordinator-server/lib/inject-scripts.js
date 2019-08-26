injectScripts = async function(port) {
    const injectScript = (source) => {
        return new Promise((resolve) => {
            var script = document.createElement('script');
            script.async = 1;
            script.src = source;
        
            script.onload = script.onreadystatechange = (_, isAbort) => {
                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                    script.onload = script.onreadystatechange = null;
                    script = undefined;
                    if (!isAbort) {
                        resolve();
                    }
                }
            };
            
            document.head.appendChild(script);
        });
    };

    await injectScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js')
    await injectScript('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js')
    await injectScript('https://cdnjs.cloudflare.com/ajax/libs/optimal-select/4.0.1/optimal-select.js')
    
    await injectScript(`http://localhost:${port}/events.js`);
    await injectScript(`http://localhost:${port}/action.sniffer.js`);
    await injectScript(`http://localhost:${port}/client.js`);
    
    alert("You can start testing now");
}

module.exports = injectScripts;