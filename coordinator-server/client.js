var socket = io();
document.addEventListener('click', function (event) {
    socket.emit('clientClick', 'Client just clicked on something!');
}, false);