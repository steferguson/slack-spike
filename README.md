# Slack spike

This api is used to test bot events from `test-realm` slack workspace.

## Webhook/events method

Would require bot on slack that pings whenever a new member joins. This gives us the ID of the user and email which we could send to passport to add the Slack id.

Event used is [team_join](https://api.slack.com/events/team_join).

Below is event from

```javascript
...
event: {
  type: 'team_join',
  user: {
    id: '<slack user id>',
    team_id: '<team-id>',
    name: '<name.name>',
    deleted: false,
    color: '684b6c',
    real_name: '<display name>',
    tz: 'Europe/London',
    tz_label: 'Greenwich Mean Time',
    tz_offset: 0,
    profile: {
      title: '',
      phone: '',
      skype: '',
      real_name: '<name>',
      real_name_normalized: '<name>',
      display_name: '<name>',
      display_name_normalized: '<name>',
      fields: {},
      status_text: '',
      status_emoji: '',
      status_emoji_display_info: [],
      status_expiration: 0,
      avatar_hash: 'gcbeda5c78f3',
      email: '<email address>',
      first_name: 'name',
      last_name: 'name',
      image_24: '<url>',
      image_32: '<url>',
      image_48: '<url>',
      image_72: '<url>',
      image_192: '<url>',
      image_512: '<url>',
      status_text_canonical: '',
      team: '<team id>'
    },
    is_admin: false,
    is_owner: false,
    is_primary_owner: false,
    is_restricted: false,
    is_ultra_restricted: false,
    is_bot: false,
    is_app_user: false,
    updated: 1669806033,
    is_email_confirmed: true,
    who_can_share_contact_card: 'EVERYONE',
    presence: 'away'
  },
  cache_ts: 1669806033,
  event_ts: '1669806033.008700'
},
...
```
