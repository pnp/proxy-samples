# Track language model usage and costs

## Summary

Sample web app that demonstrates how to use Dev Proxy to monitor and track LLM usage and costs.

![GitHub Actions summary for 'Test Dev Proxy LLM Usage with Playwright #38' by garrytrinder. Status: Success. Duration: 3m 40s. Includes LLM usage report for gpt-4-1-2025-04-14 showing token usage and cost in development environment.](/assets/llm-usage-github.png)

The sample showcases:

- **LLM Cost Tracking**: Monitor token usage and costs for OpenAI API calls
- **Functional API Integration**: Serve test data using CrudApiPlugin
- **Latency Simulation**: Add realistic delays to API responses
- **VS Code Integration**: Use Dev Proxy Toolkit for local development and testing
- **End-to-End Testing**: Playwright tests that verify the complete AI pipeline
- **CI/CD Integration**: GitHub Actions workflow with automated testing

## Compatibility

![Dev Proxy v1.0.0-beta.8](https://img.shields.io/badge/devproxy-v1.0.0-green.svg)

## Contributors

* [Garry Trinder](https://github.com/garrytrinder)

## Version history

Version|Date|Comments
-------|----|--------
1.2|January 18, 2026|Moved config files to .devproxy folder
1.1|January 5, 2026|Updated to Dev Proxy v2.0.0
1.0|July 28, 2025|Initial release

## Minimal path to awesome

1. Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/llm-usage) then unzip it)
1. Open the repository in Visual Studio Code
1. Install the [Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) extension

### Run locally (with local AI)

> [!NOTE]
>
> For Dev Proxy to simulate AI responses, you will need to run a local model on your machine which is accessible via an OpenAI API compatible endpoint, .e.g. Ollama. By default, this sample uses the Llama 3.2 model, change the `languageModel.model` property in the `.devproxy/simulate-ai.json` file to use a different model. Ensure that the model is running before starting Dev Proxy.

1. Start debug session in Visual Studio Code by pressing <kbd>F5</kbd>
1. Wait for the process to complete
1. Open the markdown file that is created in the root of the project to view the LLM usage report for the run.

### Run locally (with cloud AI)

1. Generate a fine-grained personal access token with `models:read` permission granted.
1. Update the `apiKey` variable value in `js/env.js` with your token.
1. Open **Run and Debug** panel and select **🧪 Run tests, cloud AI & local API** debug configuration
1. Start the debug session by pressing <kbd>F5</kbd>
1. Wait for the process to complete
1. Open the markdown file that is created in the root of the project to view the LLM usage report for the run.

### Run in GitHub Actions

> [!NOTE]
>
> Enable GitHub Actions in your repository settings before running the workflow.

1. Push the **main** branch to your GitHub repository
1. Open a browser and navigate to your repository
1. Open the **Actions** tab in your repository
1. Trigger the **Test Dev Proxy LLM Usage with Playwright** workflow manually
1. Wait for the workflow to complete
1. View the usage report in the job summary

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20llm-usage%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-llm-usage)
