const io = require("socket.io");
const server = io.listen(3000);
const users = []
server.on('connection', (socket) => {
 console.log(socket.id + " Connected");
 socket.on('message', (newMsg) => {
   var usr;
   for(var i = 0; i < users.length; i++){
      if(users[i].socketId === newMsg.socketId)
      {
         usr = users[i].user
         break;
      }
   }
   var text = usr + ': ' + newMsg.msg;
    server.emit('message', text);
 })
 socket.on('login', (newEntry) => {
    users.push(newEntry);
    socket.emit('loggedIn', "Welcome to the chat " + newEntry.user + "!")
    server.emit('userList', users)
    socket.broadcast.emit('newLogIn', newEntry.user + " has joined the chat!")
 } )

 socket.on('disconnect', () => {
    console.log(socket.id + " Disconnected")
    for(var i = 0; i < users.length; i++){
       if(users[i].socketId === socket.id)
       {
          console.log("deleted " + users[i].user)
          users.splice(i,1);
          break;
       }
    }
    server.emit('userList', users)
 })
});