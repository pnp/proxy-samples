# Minimal PowerShell script using Dev Proxy

## Summary

This sample demonstrates the minimal setup to use Dev Proxy with a PowerShell script. It shows how to:

- Configure Dev Proxy to intercept API requests
- Mock API responses using the MockResponsePlugin
- Run a PowerShell script through Dev Proxy using `Invoke-RestMethod`

The sample makes a single API call to JSONPlaceholder and returns a mocked response, demonstrating how Dev Proxy intercepts and replaces the real API call.

![Dev Proxy mocking a PowerShell API request](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 5, 2026|Initial release

## Prerequisites

- [Dev Proxy](https://aka.ms/devproxy)
- [PowerShell 7.x](https://github.com/PowerShell/PowerShell)

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/minimal-powershell) and unzip it)
- Navigate to the sample folder: `cd samples/minimal-powershell`
- In one terminal, start Dev Proxy: `devproxy`
- In another terminal, run the script: `pwsh app.ps1`
- Observe the mocked API response in the console with headers `x-powered-by: Dev Proxy` and `x-mocked-by: Dev Proxy MockResponsePlugin`

## Features

This sample illustrates the following concepts:

- Configuring Dev Proxy with a `.devproxy/devproxyrc.json` file
- Using MockResponsePlugin to return custom API responses
- Running PowerShell scripts through Dev Proxy using `-Proxy` parameter
- Using `-SkipCertificateCheck` to bypass SSL validation for Dev Proxy
- Adding custom headers to mocked responses

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20minimal-powershell%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-minimal-powershell)
