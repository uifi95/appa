$(document).ready(function () {
    document.sniffer = new ActionSniffer();
    document.sniffer.attach();

    document.socket = io("http://localhost:{{PORT_NUMBER}}");
});