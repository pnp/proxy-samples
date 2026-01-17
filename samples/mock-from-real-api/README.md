# Auto-generate mocks from production traffic

## Summary

This sample demonstrates how to use Dev Proxy's MockGeneratorPlugin to automatically generate mock files from real API traffic. Instead of manually creating mock responses, you can record actual API interactions and have Dev Proxy generate the mocks for you. This enables a powerful "record once, mock forever" workflow for offline development.

The sample includes a simple web app that makes API calls to JSONPlaceholder, allowing you to easily capture real API responses and generate mocks.

![Dev Proxy generating mock files from intercepted API requests](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

* [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 17, 2026|Initial release

## Prerequisites

- [Dev Proxy](https://aka.ms/devproxy)
- [Node.js LTS](https://nodejs.org) (for http-server)

## Minimal path to awesome

### Using the demo web app

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/mock-from-real-api) then unzip it)
* Navigate to the sample folder: `cd samples/mock-from-real-api`
* In a separate terminal, start Dev Proxy: `devproxy --urls-to-watch "https://jsonplaceholder.typicode.com/*"`
* Start the web app: `npx http-server -p 3000`
* Open http://localhost:3000 in your browser
* Click the buttons to make API requests through Dev Proxy
* Press `S` in the Dev Proxy terminal to stop recording
* Find the generated mock file `mocks-yyyyMMddHHmmss.json` in the current folder

## Features

This sample provides a preset for automatically generating mock files from intercepted API traffic.

**Workflow:**
1. **Record** - Start Dev Proxy with recording enabled (configured in `.devproxy/devproxyrc.json`)
2. **Interact** - Use your application normally, making requests to the APIs you want to mock
3. **Generate** - Stop recording and Dev Proxy automatically creates a mocks file
4. **Reuse** - Use the generated mocks file with MockResponsePlugin for offline development

**Key Benefits:**
* **No manual mock creation** - Mocks are generated automatically from actual API responses
* **Accurate responses** - Captured responses reflect real API behavior including headers and status codes
* **Quick setup** - Get working mocks in minutes instead of hours of manual work
* **Offline development** - Once mocks are generated, no internet connection needed
* **Consistent testing** - Use the same mocks across your team for reliable test results

Using this sample you can use Dev Proxy to:

* Capture real API responses and generate mock files automatically
* Enable offline development without manual mock file creation
* Create accurate mocks that match production API behavior
* Quickly prototype and test applications with realistic data

## Using generated mocks

After generating mocks, create a new config file to use them with MockResponsePlugin:

```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/rc.schema.json",
  "plugins": [
    {
      "name": "MockResponsePlugin",
      "enabled": true,
      "pluginPath": "~appFolder/plugins/DevProxy.Plugins.dll",
      "configSection": "mockResponsePlugin"
    }
  ],
  "urlsToWatch": [
    "https://jsonplaceholder.typicode.com/*"
  ],
  "mockResponsePlugin": {
    "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/mockresponseplugin.schema.json",
    "mocksFile": "mocks-yyyyMMddHHmmss.json"
  }
}
```

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20mock-from-real-api%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-mock-from-real-api)
