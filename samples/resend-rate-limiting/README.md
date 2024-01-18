# Simulate rate limiting on Resend APIs

## Summary

This sample contains a preset to simulate rate limiting on Resend APIs. Resend APIs support rate limiting, which is a mechanism that informs developers of the available server resources and allows them to increase the data throughput by staying under the rate limits and avoiding throttling.

![Dev Proxy simulating rate limiting on Resend APIs](assets/screenshot.png)

## Compatibility

![Dev Proxy v0.14.0](https://img.shields.io/badge/devproxy-v0.14.0--beta.6-green.svg)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.3|January 17, 2024|Updated plugin path
1.2|January 11, 2024|Updated to new format
1.2|December 22, 2023|Updated to new format
1.1|November 14, 2023|Renamed to Dev Proxy
1.0|September 17, 2023|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/resend-rate-limiting) then unzip it)
- Start Dev Proxy specifying the path to one of the config files, eg. `devproxy --config-file resend-rate-limiting.json`

## Features

- simulate the 10 requests per second limit using the `resend-rate-limiting.json` preset
- simulate the 100 emails per day limit using the `resend-rate-limiting-daily.json` preset

For more information about the configuration options, see the [documentation of the RateLimitingPlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/ratelimitingplugin).

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%resend-rate-limiting%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-resend-rate-limiting)
