const app = require("./app");
const config = require("./utils/config");
const http = require('http')
const cors = require('cors')

const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
})


server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});