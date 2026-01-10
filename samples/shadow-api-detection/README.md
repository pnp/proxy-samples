# Find shadow APIs with Azure API Center

## Summary

This sample demonstrates how to use Dev Proxy to detect APIs not registered in Azure API Center (shadow APIs). Shadow APIs are APIs that your application uses but aren't registered in your organization's API catalog. By detecting shadow APIs, you can improve API governance, compliance, and security by ensuring all APIs are properly cataloged.

<!--
Add a screenshot showing Dev Proxy detecting shadow APIs.
Recommended resolution: 1920x1080
Example: ![Dev Proxy detecting shadow APIs not registered in Azure API Center](assets/screenshot.png)
-->

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 6, 2026|Initial release

## Prerequisites

- [Azure API Center](https://learn.microsoft.com/azure/api-center/)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension for Visual Studio Code

## Minimal path to awesome

- Create Azure API Center instance
  - Get the API Center instance name, resource group name and subscription ID
- In API Center, create a new API and import the OpenAPI spec from the `.devproxy/api.contoso.com.json` file
- In the `.devproxy/devproxyrc.json` file, in the `apiCenterOnboardingPlugin` update the API Center information
- Start Dev Proxy by running `devproxy --config-file .devproxy/devproxyrc.json`
- In VSCode, open the `shadow-api-detection.http` file and run the requests to the API
- In the terminal where Dev Proxy is running, press `s` to stop recording
- Dev Proxy will generate a report showing which APIs are registered and which are shadow APIs

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20shadow-api-detection%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-shadow-api-detection)
