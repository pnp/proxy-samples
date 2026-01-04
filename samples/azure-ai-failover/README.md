# Simulate Azure OpenAI to GitHub Models failover

## Summary

This sample demonstrates how to test failover logic from Azure OpenAI to GitHub Models using Dev Proxy. The sample includes a chat app that attempts to use Azure OpenAI as the primary provider and automatically fails over to GitHub Models when Azure OpenAI is unavailable.

**Key benefit**: You don't need an actual Azure OpenAI deployment to test failover! Dev Proxy simulates Azure OpenAI failures, and the app falls back to GitHub Models using just your GitHub token.

The sample configures Dev Proxy to fail all requests to Azure OpenAI with various error responses (503, 500, 429, 504), demonstrating how your application should handle service disruptions and automatically route traffic to a backup provider.

![Dev Proxy simulating Azure OpenAI errors and failover to GitHub Models](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 5, 2026|Initial release

## Minimal path to awesome

### Prerequisites

1. **Get a GitHub Token** (for GitHub Models API):
   
   The easiest way is to use this pre-filled link that creates a token with the correct permissions:
   
   👉 **[Create GitHub Models Token](https://github.com/settings/personal-access-tokens/new?name=GitHub+Models+token&description=Used%20to%20call%20GitHub%20Models%20APIs&user_models=read)**
   
   Or create one manually:
   1. Go to [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
   2. Click **Generate new token**
   3. Give it a name (e.g., "GitHub Models token")
   4. Set an expiration
   5. Under **Permissions → Account permissions**, find **Models** and set it to **Read**
   6. Click **Generate token** and copy the token

   > **Note**: The token needs the `models:read` permission to access [GitHub Models](https://github.com/marketplace/models).

2. **Install Dev Proxy** if you haven't already:
   - See [Dev Proxy setup guide](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started/set-up)

### Run the Demo

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/azure-ai-failover) then unzip it)
- Start Dev Proxy: `devproxy`
- In a new terminal, start the web server: `npx http-server -p 3000`
- Open http://localhost:3000 in your browser
- Enter your GitHub token and start chatting
- Watch Dev Proxy fail Azure OpenAI requests and the app automatically failover to GitHub Models

## Features

This preset simulates various Azure OpenAI failure scenarios:

- **503 Service Unavailable** - Server temporarily unable to handle requests
- **500 Internal Server Error** - Service encountered an internal error
- **429 Too Many Requests** - Rate limit exceeded with dynamic Retry-After header
- **504 Gateway Timeout** - Gateway did not receive a response in time

Using this sample you can:

- Test that your application correctly detects Azure OpenAI failures
- Validate automatic failover to GitHub Models as a backup provider
- Ensure proper error handling and user feedback during outages
- Verify retry logic with Retry-After headers
- Test circuit breaker patterns in your application

### Demo chat app

The included `index.html` is a minimal client-side chat application that:

- Attempts to call Azure OpenAI first (intercepted by Dev Proxy)
- Automatically fails over to GitHub Models when Azure OpenAI fails
- Shows real-time status of both providers
- Displays which provider responded to each message
- Requires only a GitHub token - no Azure subscription needed!

### Adjusting failure rate

By default, the sample fails 100% of requests to Azure OpenAI. To simulate intermittent failures:

1. Open `devproxyrc.json`
2. Change the `rate` value in the `azureOpenAIFailover` section (0-100)

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20azure-ai-failover%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-azure-ai-failover)
