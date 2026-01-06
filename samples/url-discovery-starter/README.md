# Find which APIs your app calls

## Summary

This sample helps developers discover which URLs their app calls. It's a zero-config starting point to find all APIs your app uses automatically. Once you discover the URLs, you can use them to configure Dev Proxy to simulate behaviors for them.

The sample uses the `UrlDiscoveryPlugin` to discover URLs from intercepted traffic and the `PlainTextReporter` to output the discovered URLs to a text file.

![Dev Proxy discovering URLs from intercepted traffic](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [GitHub Copilot](https://github.com/copilot)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 6, 2026|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/url-discovery-starter) then unzip it)

### Option 1: Use the built-in discover flag (recommended)

The simplest way to discover URLs is to use the `--discover` flag:

```bash
# Discover URLs from Edge browser
devproxy --discover --watch-process-names msedge

# Discover URLs from Node.js app
devproxy --discover --watch-process-names node

# Discover URLs from Python app
devproxy --discover --watch-process-names python
```

### Option 2: Use this sample's configuration file

Navigate to the sample folder and start Dev Proxy with this configuration:

```bash
cd samples/url-discovery-starter
devproxy --config-file devproxyrc.json --watch-process-names msedge
```

### After running either option

1. Use your application to issue API requests
1. Stop Dev Proxy by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>
1. Open the generated `UrlDiscoveryPlugin_PlainTextReporter.txt` file to see the list of discovered URLs
1. Use the discovered URLs in your Dev Proxy configuration by adding them to the `urlsToWatch` array

## Output example

After stopping Dev Proxy, you'll find a file named `UrlDiscoveryPlugin_PlainTextReporter.txt` in the current directory with content similar to:

```text
https://api.contoso.com/*
https://graph.microsoft.com/*
https://jsonplaceholder.typicode.com/*
```

## Features

This sample illustrates the following concepts:

- Using the `--discover` flag to run Dev Proxy in discovery mode
- Using the `UrlDiscoveryPlugin` to discover URLs from intercepted traffic
- Using the `PlainTextReporter` to output discovered URLs to a text file
- Filtering traffic by process name using `--watch-process-names`
- Using discovered URLs to configure Dev Proxy

## Why this is useful

When starting with Dev Proxy, you need to know which URLs your app calls. Instead of manually searching through your code or network traces, you can use this sample to automatically discover all the APIs your app uses. This gives you a zero-config starting point to configure Dev Proxy.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20url-discovery-starter%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-url-discovery-starter)
