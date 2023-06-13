const merger = async function (data) {
  const uint8Array = new Uint8Array(data);
  const jsonString = new TextDecoder().decode(uint8Array);
  const jsonObject = JSON.parse(jsonString);
  return jsonObject;
};

module.exports = merger;
