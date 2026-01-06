# Find shadow APIs with Azure API Center

## Summary

This sample demonstrates how to use Dev Proxy to detect APIs not registered in Azure API Center (shadow APIs). Shadow APIs are APIs that your application uses but aren't registered in your organization's API catalog. Detecting shadow APIs helps you improve API governance, compliance, and security by ensuring all APIs are properly cataloged before reaching production.

The sample shows how to:
- Configure Dev Proxy to check API requests against Azure API Center
- Detect unregistered (shadow) APIs
- Automatically onboard new APIs with OpenAPI specs
- Integrate shadow API detection in CI/CD pipelines

<!--
Add a screenshot showing Dev Proxy detecting shadow APIs.
Recommended resolution: 1920x1080
Example: ![Dev Proxy detecting shadow APIs not registered in Azure API Center](assets/screenshot.png)
-->

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [GitHub Copilot](https://github.com/copilot)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 6, 2026|Initial release

## Prerequisites

- [Azure API Center](https://learn.microsoft.com/azure/api-center/) instance
- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) (for authentication)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension for Visual Studio Code (optional, for testing)

## Minimal path to awesome

1. Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/shadow-api-detection) then unzip it)
1. Create an Azure API Center instance and register your organization's APIs
1. Get the API Center instance name, resource group name, and subscription ID
1. In the `devproxyrc.json` file, update the `apiCenterOnboardingPlugin` section with your API Center information:
   - `subscriptionId`: Your Azure subscription ID
   - `resourceGroupName`: The resource group containing your API Center
   - `serviceName`: Your API Center instance name
1. Sign in to Azure using `az login`
1. Start Dev Proxy in recording mode: `devproxy --config-file devproxyrc.json --record`
1. Issue API requests through Dev Proxy using the `demo-requests.http` file or by running `curl -ikx http://127.0.0.1:8000 https://jsonplaceholder.typicode.com/posts`
1. Press `s` to stop recording
1. Dev Proxy generates a report showing which APIs are registered and which are shadow APIs

## Features

This sample demonstrates API governance automation using Dev Proxy and Azure API Center:

- **Shadow API detection**: Identifies APIs used by your application that aren't registered in Azure API Center
- **Automatic onboarding**: Optionally creates new API entries in API Center for discovered shadow APIs
- **OpenAPI spec generation**: Generates OpenAPI specs for new APIs to speed up onboarding
- **CI/CD integration**: Can be integrated into pipelines to fail builds when shadow APIs are detected

## Configuration options

### Basic shadow API detection

Set `createApicEntryForNewApis` to `false` to only report shadow APIs without creating entries:

```json
{
  "apiCenterOnboardingPlugin": {
    "subscriptionId": "your-subscription-id",
    "resourceGroupName": "your-resource-group",
    "serviceName": "your-api-center",
    "createApicEntryForNewApis": false
  }
}
```

### Automatic onboarding with OpenAPI specs

Set `createApicEntryForNewApis` to `true` and include the `OpenApiSpecGeneratorPlugin` before `ApiCenterOnboardingPlugin` to automatically onboard new APIs with generated OpenAPI specs:

```json
{
  "plugins": [
    {
      "name": "OpenApiSpecGeneratorPlugin",
      "enabled": true,
      "pluginPath": "~appFolder/plugins/DevProxy.Plugins.dll"
    },
    {
      "name": "ApiCenterOnboardingPlugin",
      "enabled": true,
      "pluginPath": "~appFolder/plugins/DevProxy.Plugins.dll",
      "configSection": "apiCenterOnboardingPlugin"
    }
  ],
  "apiCenterOnboardingPlugin": {
    "createApicEntryForNewApis": true
  }
}
```

### Environment variables for CI/CD

Use environment variables for sensitive configuration in CI/CD pipelines:

```json
{
  "apiCenterOnboardingPlugin": {
    "subscriptionId": "@AZURE_SUBSCRIPTION_ID",
    "resourceGroupName": "@AZURE_RESOURCE_GROUP_NAME",
    "serviceName": "@AZURE_APIC_INSTANCE_NAME"
  }
}
```

## CI/CD integration example

### GitHub Actions workflow

```yaml
name: Shadow API Detection

on:
  pull_request:
    branches: [main]

jobs:
  check-shadow-apis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Setup Dev Proxy
        uses: dev-proxy-tools/actions/setup@v1
        with:
          auto-record: true

      - name: Run application tests
        run: |
          # Run your application tests here
          # Dev Proxy intercepts all API requests

      - name: Stop Dev Proxy
        uses: dev-proxy-tools/actions/stop@v1

      - name: Check for shadow APIs
        run: |
          if grep -q "New APIs that aren't registered" ApiCenterOnboardingPlugin_PlainTextReporter.txt; then
            echo "::error::Shadow APIs detected! Please register all APIs in API Center."
            cat ApiCenterOnboardingPlugin_PlainTextReporter.txt
            exit 1
          fi

      - name: Upload reports
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: shadow-api-report
          path: ./*Reporter*
```

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20shadow-api-detection%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-shadow-api-detection)
