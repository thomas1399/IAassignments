const io = require("socket.io");
const server = io.listen(3000);
server.on('connection', (socket) => {
 console.log('connected');
 server.emit('message', 'Hello, Thomas!');
});