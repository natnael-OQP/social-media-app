const io = require('socket.io')(8900, {
    cors: {
        origin: 'https://piper-chats-api.herokuapp.com',
    },
})

io.on('connection', (socket) => {
    console.log('a user connected')
})
