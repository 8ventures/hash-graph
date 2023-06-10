const WebSocket = require('ws');

const API_KEY = 'F197CEFC-0716-48B2-BE2D-BB213C6E17D4';
const API_URL = 'wss://ws-sandbox.coinapi.io/v1/';

const socket = new WebSocket(API_URL);

socket.on('open', () => {
  console.log('Connected to CoinApi endpoint.');

  const hello = {
    type: 'hello',
    apikey: API_KEY,
    heartbeat: false,
    subscribe_data_type: ['ohlcv'],
    subscribe_filter_symbol_id: [
      'COINBASE_SPOT_ETH_USD',
      // 'COINBASE_SPOT_BTC_USD',
    ],
    subscribe_filter_period_id: ['1SEC'],
  };
  socket.send(JSON.stringify(hello));
});

socket.on('close', () => {
  console.log('Disconnected from CoinApi endpoint.');
});

socket.on('error', (error) => {
  console.log('Error from CoinApi:', error);
});

socket.on('connection-error', (error) => {
  console.log('Connection error:', error);
});

module.exports = socket;
