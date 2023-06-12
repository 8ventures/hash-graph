const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const session = require('express-session');
const { createServer } = require('http');
const { Server } = require('socket.io');
const apiSocket = require('./ws.js');
const merger = require('./middlewares/mergeData.js');

const app = express();
const port = 3000;
const host = 'localhost';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(
  session({
    name: 'sid',
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: true,
      httpOnly: false,
    },
  })
);
app.use(router);
app.get('*', (_, res) => {
  res.status(404).send('404 Not Found');
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
  let newDataListener;
  socket.on('requestData', (payload) => {
    console.log(`Received request for data from Socket ${socket.id}:`, payload);
    if (newDataListener) {
      apiSocket.off('message', newDataListener);
    }
    newDataListener = async (message) => {
      const mergedData = await merger(message, payload);
      console.log(mergedData);
      if (mergedData) socket.emit('apiData', mergedData);
    };
    apiSocket.on('message', newDataListener);
  });
  socket.on('disconnect', () => {
    if (newDataListener) {
      apiSocket.off('message', newDataListener);
    }
  });
});

httpServer.listen(port, host, () => {
  console.log(`🚀 HashGraph Server listening at http://${host}:${port}`);
});
