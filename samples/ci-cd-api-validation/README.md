# Integrate Dev Proxy in CI/CD pipelines for API validation

## Summary

This sample demonstrates how to integrate Dev Proxy in CI/CD pipelines for API validation. It includes configurations for shadow API detection, permission validation, and OpenAPI spec generation, along with example GitHub Actions workflows and Azure Pipelines YAML files.

![Dev Proxy CI/CD API validation showing GitHub Actions workflow results](./assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 10, 2026|Initial release

## Prerequisites

- [Azure API Center](https://learn.microsoft.com/azure/api-center/) (for shadow API detection)
- Azure CLI or Azure PowerShell authenticated for API Center access
- CI/CD platform (GitHub Actions or Azure Pipelines)

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/ci-cd-api-validation) then unzip it)
- Update the configuration files with your API URLs:
  - In the configuration files in `.devproxy/` folder, update the `urlsToWatch` property to match your API endpoints
- For shadow API detection with Azure API Center:
  - Create an Azure API Center instance
  - Set up the required environment variables/secrets (see CI/CD configuration sections below)
- For permission validation:
  - Add your OpenAPI specs to the `.devproxy/api-specs` folder
- Copy the workflow/pipeline files to your repository and customize as needed

## Features

Using this sample you can use the Dev Proxy to:

1. **Detect shadow APIs** - Find APIs that your application uses but aren't registered in Azure API Center
2. **Validate API permissions** - Check if your app uses minimal permissions to call APIs
3. **Generate OpenAPI specs** - Automatically generate OpenAPI specifications from recorded API requests

## Configuration Files

This sample includes several configuration files for different validation scenarios:

| File | Description |
|------|-------------|
| `.devproxy/devproxyrc.json` | Combined configuration with all plugins enabled |
| `.devproxy/shadow-api-detection.json` | Configuration for detecting unregistered APIs using Azure API Center |
| `.devproxy/permission-validation.json` | Configuration for validating API permissions |
| `.devproxy/openapi-generation.json` | Configuration for generating OpenAPI specifications |

## GitHub Actions

The sample includes a GitHub Actions workflow (`.github/workflows/api-validation.yml`) that runs three parallel jobs:

1. **Shadow API detection** - Detects unregistered APIs
2. **Permission validation** - Validates API permissions
3. **OpenAPI generation** - Generates OpenAPI specs from requests

### Required secrets and variables

To use the workflow with Azure API Center, configure the following:

| Type | Name | Description |
|------|------|-------------|
| Variable | `AZURE_SUBSCRIPTION_ID` | Azure subscription ID containing API Center |
| Variable | `AZURE_RESOURCE_GROUP_NAME` | Resource group name containing API Center |
| Variable | `AZURE_APIC_INSTANCE_NAME` | API Center instance name |

See [Creating configuration variables for a repository](https://docs.github.com/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) for instructions on setting up variables.

## Azure Pipelines

The sample includes an Azure Pipelines configuration (`azure-pipelines.yml`) with three parallel stages:

1. **Shadow API detection** - Detects unregistered APIs
2. **Permission validation** - Validates API permissions
3. **OpenAPI generation** - Generates OpenAPI specs from requests

### Required variables

To use the pipeline with Azure API Center, configure the following pipeline variables:

| Name | Description |
|------|-------------|
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID containing API Center |
| `AZURE_RESOURCE_GROUP_NAME` | Resource group name containing API Center |
| `AZURE_APIC_INSTANCE_NAME` | API Center instance name |

See [Set variables in a pipeline](https://learn.microsoft.com/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbash) for instructions on setting up variables.

## Local testing

To test the configurations locally:

1. Start Dev Proxy with the desired configuration:

   ```bash
   devproxy --config-file .devproxy/shadow-api-detection.json --record
   ```

2. Make API requests using curl through Dev Proxy:

   ```bash
   curl -ikx http://127.0.0.1:8000 https://api.contoso.com/customers
   ```

3. Stop recording by pressing <kbd>S</kbd>
4. Stop Dev Proxy by pressing <kbd>Ctrl</kbd> + <kbd>C</kbd>
5. Review the generated reports

## Customization

### Adding your APIs

1. Update the `urlsToWatch` in each configuration file to match your API endpoints
2. If using permission validation, add your OpenAPI specs to `.devproxy/api-specs`

### Integrating with your tests

Replace the example curl commands in the workflow files and `run.sh` script with your actual test commands:

```yaml
- name: Run API tests
  run: |
    npm test
    # or
    dotnet test
    # or
    python -m pytest
```

### Failing the pipeline on issues

To fail the pipeline when shadow APIs or permission issues are found, add validation logic after Dev Proxy completes:

```bash
# Check for shadow APIs
if grep -q "New APIs" ApiCenterOnboardingPlugin_MarkdownReporter.md; then
  echo "Shadow APIs detected!"
  exit 1
fi
```

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20ci-cd-api-validation%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-ci-cd-api-validation)
