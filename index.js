const express = require('express');
const app = express();

app.use(express.json());

app.post('/slack-webhook-verify', (req, res) => {
  console.log('Hello we are no logging\nfull body log:');
  console.log(req.body);

  console.log('log user profile:');
  console.log(req.body.event.user.profile);

  // required to return challenge for slack
  res.status(200).json({ challenge: req.body.challenge });
});

app.post('/slack-webhook', (req, res) => {
  res.status(200).json({ msg: 'yes' });
});

app.all('/', (req, res) => {
  console.log('Just got a request!');

  res.send('Yo!');
});

app.listen(process.env.PORT || 3000);
