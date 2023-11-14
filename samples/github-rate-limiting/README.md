# Simulate rate limiting on GitHub APIs

## Summary

This sample contains a preset to simulate rate limiting on GitHub APIs. GitHub APIs support rate limiting, which is a mechanism that informs developers of the available server resources and allows them to increase the data throughput by staying under the rate limits and avoiding throttling.

![Dev Proxy simulating rate limiting on Microsoft Graph APIs](assets/screenshot.png)

## Compatibility

![Dev Proxy v0.13.0-beta.5](https://img.shields.io/badge/devproxy-v0.13.0--beta.5-green.svg)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.1|November 14, 2023|Renamed to Dev Proxy
1.0|September 16, 2023|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/github-rate-limiting) then unzip it)
- Start Dev Proxy specifying the path to one of the mock files, eg. `devproxy --config-file github-rate-limiting.json`

## Features

This preset simulates rate limiting on GitHub APIs.

For more information about the configuration options, see the [documentation of the RateLimitingPlugin](https://github.com/microsoft/dev-proxy/wiki/RateLimitingPlugin).

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%github-rate-limiting%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-github-rate-limiting)
