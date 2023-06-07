const express = require('express');

const router = require('./router.js');
// const db = require('./db.js');

const app = express();
const port = 3000;
const host = 'localhost';

app.use(express.json());
app.use(router);

app.listen(port, host, () => {
  console.log(`🚀 HashGraph Server listening at http://${host}:${port}`);
});
