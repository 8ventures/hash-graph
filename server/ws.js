// const WebSocket = require('ws');

// const API_KEY = 'APIKEY';
// const API_URL = 'wss://ws-sandbox.coinapi.io/v1/';

// const socket = new WebSocket(API_URL);

// const hello = {
//   type: 'hello',
//   apikey: API_KEY,
//   heartbeat: false,
//   subscribe_data_type: ['ohlcv'],
// };

// socket.on('open', () => {
//   console.log('Connected to CoinApi endpoint.');
//   socket.send(JSON.stringify(hello));
// });

// socket.on('close', () => {
//   console.log('Disconnected from CoinApi endpoint.');
// });

// socket.on('error', (error) => {
//   console.log('Error from CoinApi:', error);
// });

// socket.on('connection-error', (error) => {
//   console.log('Connection error:', error);
// });

// module.exports = socket;
