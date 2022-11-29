const express = require('express');
const app = express();

app.post('/slack-webhook-verify', (req, res) => {
  console.log(req);
  res.status(200).json({ challenge: req.challenge });
});

app.post('/slack-webhook', (req, res) => {
  res.status(200).json({ msg: 'yes' });
});

app.all('/', (req, res) => {
  console.log('Just got a request!');

  res.send('Yo!');
});

app.listen(process.env.PORT || 3000);
