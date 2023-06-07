const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/hashgraph', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('❌ Could not connect to HashGraph DB:', error);
  }
})();

console.log('🚀 HashGraph DB connected on localhost:27017');
module.exports = mongoose;
