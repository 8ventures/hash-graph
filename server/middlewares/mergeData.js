const http = require('http');

const merger = async function (data, payload) {
  const { symbol, interval } = payload;
  const uint8Array = new Uint8Array(data);
  const jsonString = new TextDecoder().decode(uint8Array);
  const jsonObject = JSON.parse(jsonString);

  if (jsonObject.period_id === interval && jsonObject.symbol_id === symbol) {
    return jsonObject;
  }
};

module.exports = merger;
