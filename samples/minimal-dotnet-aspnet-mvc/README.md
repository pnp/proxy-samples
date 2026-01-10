# Minimal ASP.NET MVC app using Dev Proxy

## Summary

This sample demonstrates the minimal setup to use Dev Proxy with an ASP.NET MVC application. It shows how to configure Dev Proxy to intercept API requests and mock responses using the MockResponsePlugin. The sample makes a single API call to JSONPlaceholder from a controller and displays the mocked response in a Razor view.

![Dev Proxy mocking an ASP.NET MVC app API request](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 5, 2026|Initial release

## Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)

## Minimal path to awesome

- Clone this repository (or [download this solution as a ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/minimal-dotnet-aspnet-mvc) and unzip it)
- Navigate to the sample folder
- In one terminal, start Dev Proxy: `devproxy`
- In another terminal, run the app: `dotnet run`
- Open https://localhost:5001 in your browser
- Observe the mocked API response on the page

## Features

This sample demonstrates:

- Using MockResponsePlugin to mock API responses
- Displaying mocked API responses in a Razor view

## How it works

1. When the home page is loaded, the controller makes a GET request to `https://jsonplaceholder.typicode.com/posts/1`
2. Dev Proxy intercepts the request and returns the mocked response defined in `mocks.json`
3. The mocked response is displayed on the page

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20minimal-dotnet-aspnet-mvc%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-minimal-dotnet-aspnet-mvc)
