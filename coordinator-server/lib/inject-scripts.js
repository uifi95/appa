injectScripts = async function(port) {
    const scriptIdPrefix = 'APPA_INJECTED_SCRIPT_';
    const scripts = [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', id: `1.${scriptIdPrefix}jQuery`},
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js', id: `2.${scriptIdPrefix}SocketIO`},
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/optimal-select/4.0.1/optimal-select.js', id: `3.${scriptIdPrefix}OptimalSelect`},

        { src: `http://localhost:${port}/events.js`, id: `4.${scriptIdPrefix}events`},
        { src: `http://localhost:${port}/action.sniffer.js`, id: `5.${scriptIdPrefix}actionSniffer`},
        { src: `http://localhost:${port}/client.js`, id: `6.${scriptIdPrefix}client`},
    ];

    const injectScript = (source, id) => {
        return new Promise((resolve) => {
            if (!document || document.getElementById(id)) { // script already exists, skip
                resolve();
                return;
            }

            var script = document.createElement('script');
            script.async = false; // async must be false as there are dependencies between the scripts
            script.src = source;
            script.id = id;
            
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

    scripts.forEach(async script => await injectScript(script.src, script.id));
}

module.exports = injectScripts;