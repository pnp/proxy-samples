# Simulate errors on Microsoft Graph with HTTP Cats

## Summary

**Testing doesn't have to boring!**

Use this preset to return funny cat images when simulating erroneous HTTP status codes for Microsoft Graph. When you test your app in the browser, and the Microsoft 365 Developer Proxy simulates an error, you will see a funny cat image instead of a boring error message. Have fun! 🐱

[HTTP cat](https://http.cat) pictures by Tomomi Imura.

![Microsoft 365 Developer Proxy simulating the 429 Too Many Request error on Microsoft Graph with an image of a cat](assets/429.png)
![Microsoft 365 Developer Proxy simulating the 500 Internal Server Error error on Microsoft Graph with an image of a cat](assets/500.png)
![Microsoft 365 Developer Proxy simulating the 502 Bad Gateway error on Microsoft Graph with an image of a cat](assets/502.png)

## Compatibility

![Microsoft 365 Developer Proxy v0.11.0-beta.1](https://img.shields.io/badge/m365proxy-v0.11.0--beta.1-green.svg)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)
- [Tomomi Imura](https://github.com/girliemac)

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 10, 2023|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/http-cats) then unzip it)
- Start Microsoft 365 Developer Proxy specifying the path to one of the config file, eg. `m365proxy --config-file http-cats-config.json`

## Features

This preset contains images for the following HTTP status codes: 429, 500, 502, 503, 504 and 507.

Proxy will simulate these errors at random and return a funny cat imagine instead of a boring error message.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20http-cats%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-http-cats)
