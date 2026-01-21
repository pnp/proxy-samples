# Inspect API traffic in Chrome DevTools

## Summary

This sample demonstrates how to use Chrome DevTools to inspect API traffic intercepted by Dev Proxy. Using the DevToolsPlugin, you can view all requests and responses in the familiar Chrome DevTools Network tab, making it easy to debug and analyze API calls.

![Dev Proxy messages and requests shown in Chrome DevTools](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 10, 2026|Initial release

## Prerequisites

- [Dev Proxy](https://aka.ms/devproxy)

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/browser-devtools-debugging) and unzip it)
- Navigate to the sample folder: `cd samples/browser-devtools-debugging`
- Start Dev Proxy: `devproxy`
- Dev Proxy automatically opens a browser window with Chrome DevTools
- Send a request through Dev Proxy: `curl -ikx http://127.0.0.1:8000 https://jsonplaceholder.typicode.com/posts/1`
- View the request in the Chrome DevTools **Network** tab
- View Dev Proxy messages in the **Console** tab

### Using Chrome instead of Edge

To use Google Chrome instead of Microsoft Edge:

- Start Dev Proxy with the Chrome configuration: `devproxy --config-file .devproxy/devproxyrc-chrome.json`

## Features

This sample illustrates the following concepts:

- **View intercepted requests in Network tab**: See all API requests and responses intercepted by Dev Proxy, including headers, bodies, and timing information
- **Filter requests by URL**: Use the Network tab's filter to find specific API calls
- **Inspect request/response headers**: View detailed header information for each request
- **View request/response bodies**: Examine the payload of API requests and responses
- **See Dev Proxy messages in Console**: View plugin messages, errors, and status information in the Console tab
- **Choose your browser**: Configure Dev Proxy to use Microsoft Edge, Microsoft Edge Dev, or Google Chrome

## Configuration

The sample includes two configuration files:

### Default (Microsoft Edge)

`.devproxy/devproxyrc.json` - Uses Microsoft Edge (default) to display DevTools

```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/rc.schema.json",
  "plugins": [
    {
      "name": "DevToolsPlugin",
      "enabled": true,
      "pluginPath": "~appFolder/plugins/DevProxy.Plugins.dll"
    }
  ],
  "urlsToWatch": [
    "https://jsonplaceholder.typicode.com/*"
  ]
}
```

### Google Chrome

`.devproxy/devproxyrc-chrome.json` - Uses Google Chrome to display DevTools

Change `preferredBrowser` to `"Chrome"` to use Google Chrome.

## Supported browsers

The DevToolsPlugin supports the following browsers:

- `Edge` - Microsoft Edge
- `EdgeDev` - Microsoft Edge Dev channel
- `Chrome` - Google Chrome

## Known issues

### DevTools don't open in Microsoft Edge on Windows

If DevTools don't open or open empty when using Microsoft Edge on Windows:

1. Open Microsoft Edge
1. Go to **Settings**
1. Open **System and performance**
1. Disable **Startup boost**
1. Close all Microsoft Edge windows and processes
1. Start Dev Proxy

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20browser-devtools-debugging%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-browser-devtools-debugging)
