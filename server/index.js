const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const session = require('express-session');

const app = express();
const port = 3000;
const host = 'localhost';

app.use(express.json());
app.use(cors());
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

app.listen(port, host, () => {
  console.log(`🚀 HashGraph Server listening at http://${host}:${port}`);
});
