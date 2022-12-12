const express = require('express');
const app = express();
const { createHmac, timingSafeEqual } = require('node:crypto');

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
  const slackTimestamp = req.headers['X-Slack-Request-Timestamp'];
  console.log('X-Slack-Request-Timestamp', slackTimestamp);

  const slackSignature = req.header('X-Slack-Signature');
  console.log('X-Slack-Signature', slackSignature);
  console.log(req.body);

  // v0:123456789:command=/weather&text=94070
  const str = `v0:${slackTimestamp}:${JSON.stringify(req.body)}`;
  const slackSigningKey = process.env.SLACK_SIGNING_KEY;

  const hmac = createHmac('sha256', slackSigningKey);

  const data = hmac.update(str);

  const hashedVal = data.digest('hex');

  const valid = hashedVal === slackSignature;

  console.log('isValid', valid);

  const timingSafe = timingSafeEqual(hashedVal, slackSignature);

  console.log('timingSafe', timingSafe);
  res.status(200).send('Thank you for registering!');
});

app.all('/', (req, res) => {
  console.log('Just got a request!');

  res.send('Yo!');
});

app.listen(process.env.PORT || 3000);
