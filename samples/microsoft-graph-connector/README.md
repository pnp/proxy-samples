# Simulate creating a Microsoft Graph connector and its schema

## Summary

This sample contains a Microsoft 365 Developer Proxy mock file that simulates responses for creating a Microsoft Graph connector and provisioning its schema. Provisioning Graph connector schema is a long-running operation, and to simulate checking the status of the provisioning operation, the mock uses simulating the n-th request feature of the Developer Proxy.

![Microsoft 365 Developer Proxy simulating rate limiting on Microsoft Graph APIs](assets/m365proxy-mock-nth-request-create-connector.png)

## Compatibility

![Microsoft 365 Developer Proxy v0.12.0-beta.1](https://img.shields.io/badge/m365proxy-v0.12.0--beta.1-green.svg)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 8, 2023|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/microsoft-graph-connector) then unzip it)
- Start Microsoft 365 Developer Proxy specifying the path to the mock file, eg. `m365proxy --mocks-file microsoft-graph-connector.json`

## Features

This mock file simulates Microsoft Graph API responses for:

- creating a Microsoft Graph connector
- creating a Microsoft Graph connector schema
- checking the status of the schema provisioning operation
- completing the schema provisioning operation with a success

For more information about mocking requests see the [documentation](https://github.com/microsoft/m365-developer-proxy/wiki/Mock-responses).

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20microsoft-graph-connector%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-microsoft-graph-connector)
