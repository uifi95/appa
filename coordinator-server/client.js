var socket = io();
document.addEventListener('click', function (event) {
    // const eventToSend = {
    //     target: event.target,
    //     currentTarget: event.currentTarget
    // };
    const descriptor = { selector: OptimalSelect.select(event.target) };
    socket.emit('clientClick', descriptor);
}, false);