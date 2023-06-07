const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://localhost:27017/hashgraph', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('🚀 HashGraph DB connected on localhost:27017');
module.exports = db;
