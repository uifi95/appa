export const injectScripts = function (port: number) {
    const scriptIdPrefix = 'APPA_INJECTED_SCRIPT_';
    const scripts = [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', id: `1.${scriptIdPrefix}jQuery` },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js', id: `2.${scriptIdPrefix}SocketIO` },

        { src: `http://localhost:${port}/events.js`, id: `3.${scriptIdPrefix}events` },
        { src: `http://localhost:${port}/action.sniffer.js`, id: `4.${scriptIdPrefix}actionSniffer` },
        { src: `http://localhost:${port}/client.js`, id: `5.${scriptIdPrefix}client` },
        { src: `http://localhost:${port}/cssSelectorGenerator.js`, id: `6.${scriptIdPrefix}cssSelectorGenerator` },

    ];


    const injectScript = (source: string, id: string) => {
        return new Promise((resolve) => {
            if (!document || document.getElementById(id)) { // script already exists, skip
                resolve();
                return;
            }

            var script: any = document.createElement('script');
            script.async = false; // async must be false as there are dependencies between the scripts
            script.src = source;
            script.id = id;

            script.onload = script.onreadystatechange = (_: any, isAbort: boolean) => {
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

    scripts.forEach(script => injectScript(script.src, script.id));
}
