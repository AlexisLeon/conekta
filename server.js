const express = require('express');
const app = express()

app.use((req, res) => res.status(200).json({
  message: "Conekta Wallet API (Lab)"
}));

const server = app.listen(3000, () => {
  console.log('App started at port: 3000');
});