# Simulate rate limiting on APIs published on Azure API Management

## Summary

This sample contains a preset to simulate the rate limit policy for an API published on Azure API Management. Azure API Management allows you to define rate limits for your APIs to prevent abuse and ensure that your APIs are available for all consumers. The rate limit policy allows you to define the number of requests that can be made to an API within a specified time window. When the rate limit is exceeded, the API returns a 429 Too Many Requests response.

![Dev Proxy simulating rate limiting on an API published on Azure API Management](assets/devproxy-rate-limit.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.4|January 18, 2026|Moved config files to .devproxy folder
1.3|January 5, 2026|Updated to Dev Proxy v2.0.0
1.2|June 27, 2025|Updated to Dev Proxy v0.29.2
1.1|January 25, 2024|Updated schema version
1.0|January 17, 2024|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/apim-rate-limiting) then unzip it)
- Start Dev Proxy by running `devproxy`

## Features

This preset simulates rate limiting for APIs published on Azure API Management.

For more information about the configuration options, see the [documentation of the RateLimitingPlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/ratelimitingplugin).

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%apim-rate-limiting%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-apim-rate-limiting)
