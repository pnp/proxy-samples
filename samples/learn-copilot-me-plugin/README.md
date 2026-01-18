# CRUD API for the "Connect Copilot for Microsoft 365 to your external data in real-time with message extension plugins built with .NET and Visual Studio" learn module

## Summary

This sample contains a CRUD API for the [Connect Copilot for Microsoft 365 to your external data in real-time with message extension plugins built with .NET and Visual Studio](https://learn.microsoft.com/training/modules/copilot-message-extension-plugins/) learn module. The CRUD API simulates the behavior of a custom API protected with Microsoft Entra that returns product data. Using this preset you can complete exercises from the learn module without having to create a real custom API.

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Garry Trinder](https://github.com/garrytrinder)

## Version history

Version|Date|Comments
-------|----|--------
1.3|January 18, 2026|Moved config files to .devproxy folder
1.2|January 5, 2026|Updated to Dev Proxy v2.0.0
1.1|June 27, 2025|Updated to Dev Proxy v0.29.1
1.0|July 23, 2024|Initial release

## Minimal path to awesome

- Get the preset using Dev Proxy by running `devproxy config get learn-copilot-me-plugin`
- Start Dev Proxy with the config file, by running `devproxy`
- Follow along with the [Connect Copilot for Microsoft 365 to your external data in real-time with message extension plugins built with .NET and Visual Studio](https://learn.microsoft.com/training/modules/copilot-message-extension-plugins/) learn module

## Features

This preset contains the following endpoints and operations.

### Authentication

The CRUD API is configured to use Microsoft Entra authentication.

> [!IMPORTANT]
> All requests must send an OAuth 2.0 Bearer Token containing a scope named `Product.Read`.

### Products

Endpoint|Method|Description|Example
--------|------|-----------|-------
`products`|`GET`|Get all products|`GET https://api.contoso.com/v1/products`
`products?name={name}`|`GET`|Get products by name|`GET https://api.contoso.com/v1/products?name=mark8`
`products?category={category}`|`GET`|Get products by category |`GET https://api.contoso.com/v1/products?category=Consumer`
`products?name={name}&category={category}`|`GET`|Get products by name and category |`GET https://api.contoso.com/v1/products?name=mark8&category=Consumer`

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%learn-msgraph-toolkit-intro%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-learn-copilot-me-plugin)
