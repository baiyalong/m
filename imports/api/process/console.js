import http from 'http';
import socket_io from 'socket.io';

const PORT = 3002;

Meteor.startup(() => {
    // Server
    const server = http.createServer();
    const io = socket_io(server);

    let counter = 0;

    // New client
    io.on('connection', function (socket) {
        console.log('new socket client');
    });

    // Start server
    try {
        server.listen(PORT);
    } catch (e) {
        console.error(e);
    }
});