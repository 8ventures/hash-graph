const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const session = require('express-session');
const { createServer } = require('http');
const { Server } = require('socket.io');
const connectToCoinApi = require('./ws.js');

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
  socket.on('clientConnect', (payload) => {
    const { symbol, period } = payload;
    // Connect to CoinApi with the received symbols and periods
    console.log(payload);
    const coinApiSocket = connectToCoinApi(symbol, period);

    // Handle WebSocket events from CoinApi
    coinApiSocket.on('message', (data) => {
      console.log('Received data from CoinApi:', data);
      socket.emit('coinApiData', data);
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected.');
      coinApiSocket.close(); // Close the CoinApi WebSocket connection when a client disconnects
    });
  });

  socket.on('clientModify', (payload) => {
    const { symbol, period } = payload;

    if (coinApiSocket) {
      coinApiSocket.close(); // Close the CoinApi WebSocket connection when a client disconnects
    }
    coinApiSocket = connectToCoinApi(symbol, period);
    coinApiSocket.on('message', (data) => {
      socket.emit('coinApiData', data);
    });
  });
});

httpServer.listen(port, host, () => {
  console.log(`🚀 HashGraph Server listening at http://${host}:${port}`);
});
