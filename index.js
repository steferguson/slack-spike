const express = require('express');
const app = express();
const { createHmac, timingSafeEqual } = require('node:crypto');
const qs = require('qs');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
  const slackTimestamp = req.header('X-Slack-Request-Timestamp');
  console.log('X-Slack-Request-Timestamp', slackTimestamp);

  const slackSignature = req.header('X-Slack-Signature');
  console.log('X-Slack-Signature', slackSignature);

  console.log('typeof body', typeof req.body);
  console.log('body', req.body);
  console.log('pasrse', JSON.parse(req.body));
  const theBody = qs.stringify(req.body, { format: 'RFC1738' });
  console.log('body:', theBody);

  const str = `v0:${slackTimestamp}:${theBody}`;
  const slackSigningKey = process.env.SLACK_SIGNING_KEY;

  const hmac = createHmac('sha256', slackSigningKey);

  const data = hmac.update(str);

  const hashedVal = data.digest('hex');

  const fullHashedSignature = `v0=${hashedVal}`;

  console.log(fullHashedSignature);
  console.log(slackSignature);

  const timingSafe = timingSafeEqual(
    Buffer.from(fullHashedSignature),
    Buffer.from(slackSignature)
  );

  console.log('timingSafe', timingSafe);
  res.status(200).send('Thank you for registering!');
});

app.all('/', (req, res) => {
  console.log('Just got a request!');

  res.send('Yo!');
});

app.listen(process.env.PORT || 3000);
