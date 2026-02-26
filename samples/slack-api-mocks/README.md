# Slack API Mocks

Mock responses for the Slack Web API to test bot development, messaging, channel management, and interactive components without a live workspace

![Dev Proxy simulating Slack API responses](assets/screenshot.png)

## Summary

This sample provides mock responses for the Slack Web API, enabling developers to build and test Slack bots and apps without needing a live Slack workspace. It covers messaging, user management, channel operations, reactions, interactive modals, OAuth flow, file uploads, and more.

The mocks include realistic responses that follow the Slack API response format with `ok: true` payloads, proper pagination metadata, and standard Slack object structures.

## Compatibility

![Dev Proxy v2.1.0](https://aka.ms/devproxy/badge/v2.1.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

| Version | Date              | Comments        |
| ------- | ----------------- | --------------- |
| 1.0     | February 26, 2026 | Initial release |

## Minimal path to awesome

- Get the sample:
  - Download just this sample:

      ```bash
      npx gitload-cli https://github.com/pnp/proxy-samples/tree/main/samples/slack-api-mocks
      ```

    or

  - [Download as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/slack-api-mocks) and unzip it, or
  - Clone this repository
- Start Dev Proxy with the configuration file from the sample:

  ```bash
  devproxy
  ```

- Send requests to the Slack API with any tool, for example using curl:

  ```bash
  # Test authentication
  curl -ikx http://127.0.0.1:8000 -X POST https://slack.com/api/auth.test

  # Post a message
  curl -ikx http://127.0.0.1:8000 -X POST https://slack.com/api/chat.postMessage \
    -H "Content-Type: application/json" \
    -d '{"channel":"C00000001","text":"Hello from Dev Proxy!"}'

  # List users
  curl -ikx http://127.0.0.1:8000 https://slack.com/api/users.list

  # List channels
  curl -ikx http://127.0.0.1:8000 https://slack.com/api/conversations.list

  # Get channel history
  curl -ikx http://127.0.0.1:8000 https://slack.com/api/conversations.history

  # Add a reaction
  curl -ikx http://127.0.0.1:8000 -X POST https://slack.com/api/reactions.add \
    -H "Content-Type: application/json" \
    -d '{"channel":"C00000001","timestamp":"1700000000.000100","name":"thumbsup"}'

  # Open a modal
  curl -ikx http://127.0.0.1:8000 -X POST https://slack.com/api/views.open \
    -H "Content-Type: application/json" \
    -d '{"trigger_id":"000000000.00000000","view":{"type":"modal","title":{"type":"plain_text","text":"Test"}}}'
  ```

## Features

This sample provides mock responses for the following Slack API methods:

### Authentication

- Test authentication (`POST auth.test`)

### Messaging

- Post a message (`POST chat.postMessage`)
- Update a message (`POST chat.update`)
- Delete a message (`POST chat.delete`)
- Schedule a message (`POST chat.scheduleMessage`)

### Users

- List users (`GET/POST users.list`)
- Get user info (`GET/POST users.info`)
- Get user identity (`GET users.identity`)

### Conversations (Channels)

- List conversations (`GET/POST conversations.list`)
- Get conversation info (`GET/POST conversations.info`)
- Create a conversation (`POST conversations.create`)
- Invite users to a conversation (`POST conversations.invite`)
- List conversation members (`GET/POST conversations.members`)
- Get conversation history (`GET/POST conversations.history`)
- Get thread replies (`GET/POST conversations.replies`)

### Reactions

- Add a reaction (`POST reactions.add`)
- Remove a reaction (`POST reactions.remove`)
- Get reactions for a message (`GET/POST reactions.get`)

### Interactive Components (Modals)

- Open a modal (`POST views.open`)
- Update a modal (`POST views.update`)
- Push a modal onto the stack (`POST views.push`)
- Publish a Home tab view (`POST views.publish`)

### OAuth

- Exchange code for token (`POST oauth.v2.access`)

### Team

- Get team info (`GET/POST team.info`)

### Pins

- Pin a message (`POST pins.add`)
- Unpin a message (`POST pins.remove`)
- List pinned messages (`GET/POST pins.list`)

### Files

- Upload a file (`POST files.upload`)
- Get file info (`GET/POST files.info`)
- Delete a file (`POST files.delete`)

### Bookmarks

- Add a bookmark (`POST bookmarks.add`)
- List bookmarks (`GET/POST bookmarks.list`)

### Emoji

- List custom emoji (`GET/POST emoji.list`)

## Sample Data

The mocks use the following sample IDs that you can use in your requests:

| Resource  | ID          |
| --------- | ----------- |
| Team      | `T00000000` |
| Bot User  | `U00000001` |
| User      | `U00000002` |
| User      | `U00000003` |
| Bot       | `B00000001` |
| App       | `A00000001` |
| Channel   | `C00000001` |
| Channel   | `C00000002` |
| Channel   | `C00000003` |
| View      | `V00000001` |
| File      | `F00000001` |

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20slack-api-mocks%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-slack-api-mocks)
