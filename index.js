const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/slack-webhook-verify', (req, res) => {
  console.log(req);
  console.log('Hello we are no logging\nfull body log:');
  console.log(req.body);

  console.log('log user profile:');
  console.log(req.body.event.user.profile);

  console.log('user email:', req.body.event.user.profile.email);
  console.log('user slack id:', req.body.event.user.id);

  // required to return challenge for slack
  res.status(200).json({ challenge: req.body.challenge });
});

app.post('/slack-command-register', (req, res) => {
  console.log(req.body);

  res.status(200).send('Thank you for registering!');
});

app.all('/', (req, res) => {
  console.log('Just got a request!');

  res.send('Yo!');
});

app.listen(process.env.PORT || 3000);
