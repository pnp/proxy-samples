# Simulate throttling of the OpenAI API

## Summary

This sample contains a preset and mocks to simulate the throttling of the OpenAI API.

As more and more applications use OpenAI API to use AI, it's important that developers can verify that their apps can properly handle cases when the API is throttled. Especially when the app is using lower-tier API plans, throttling is more likely to happen so validating the app's behavior is crucial to ensure great user experience.

Using this preset you can simulate throttling of the OpenAI API and see how your app will handle it.

![Dev Proxy simulating throttling of the OpenAI API when exceeded the number of tokens per minute](assets/throttling-tokens.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.9|January 18, 2026|Moved config files to .devproxy folder
1.8|January 5, 2026|Updated to Dev Proxy v2.0.0
1.7|June 27, 2025|Updated to Dev Proxy v0.29.2
1.6|January 9, 2025|Updated to Dev Proxy v0.23
1.5|January 17, 2024|Updated plugin path
1.4|January 11, 2024|Updated to new format
1.3|January 7, 2024|Added new throttling error
1.2|December 22, 2023|Updated to new format
1.1|November 14, 2023|Renamed to Dev Proxy
1.0|August 10, 2023|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/openai-throttling) then unzip it)
- Start Dev Proxy by running `devproxy`

## Features

This preset includes configuration for simulating 3 different throttling scenarios:

- exceeded tokens per minute
  ![Dev Proxy simulating throttling of the OpenAI API when exceeded the number of tokens per minute](assets/throttling-tokens.png)
- exceeded number of requests per minute
  ![Dev Proxy simulating throttling of the OpenAI API when exceeded the number of requests per minute](assets/throttling-requests.png)
- service overload, which includes dynamic simulation of handling retry-after
  ![Dev Proxy simulating throttling of the OpenAI API when the server is overloaded](assets/throttling-overloaded.png)

Proxy will simulate throttling the API using one of these modes at random.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20microsoft-graph-docs-mocks%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-openai-throttling)
