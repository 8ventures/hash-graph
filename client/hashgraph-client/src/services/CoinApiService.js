// import io from 'socket.io-client';
// const socket = io('http://localhost:3000/');

// export default socket;

function fetchOHLCVData(symbolId, period) {
  const apiKey = 'APIKEY'; // Replace with your CoinAPI API key
  const url = `https://rest.coinapi.io/v1/ohlcv/${symbolId}/history?period_id=${period}&apikey=${apiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export default fetchOHLCVData;
