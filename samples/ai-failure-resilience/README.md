# Test AI app against LLM failure modes

## Summary

Sample chat application that demonstrates how to test AI applications against common large language model (LLM) failure modes using Dev Proxy's LanguageModelFailurePlugin. The app shows how to build resilient AI applications that gracefully handle unexpected or problematic LLM responses.

![Screenshot of the AI Failure Resilience demo app showing a chat interface with Dev Proxy simulating LLM failure modes](assets/screenshot.png)

The sample showcases:

- **Chat Interface**: Interactive chat UI to test LLM interactions
- **LLM Failure Simulation**: Dev Proxy injects various failure types into API responses
- **Graceful Error Handling**: Demonstrates how to handle problematic LLM responses
- **VS Code Integration**: Use Dev Proxy Toolkit for local development and testing

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Copilot](https://github.com/copilot)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 6, 2026|Initial release

## Minimal path to awesome

1. Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/ai-failure-resilience) then unzip it)
1. Open the sample folder in Visual Studio Code
1. Install the [Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) extension
1. Install dependencies: `npm install`
1. Update the `apiKey` in `js/env.js` with your OpenAI API key
1. Start the debug session by pressing <kbd>F5</kbd>
1. The browser opens with the chat interface
1. Type questions and observe how Dev Proxy injects failure responses

### Running manually

1. Start Dev Proxy: `devproxy --config-file .devproxy/devproxyrc.json`
1. In a separate terminal, start the web server: `npm start`
1. Open http://localhost:3000 in your browser
1. Configure your browser to use the Dev Proxy (http://127.0.0.1:8000)

## Simulated failure types

The sample includes configuration for seven common LLM failure types:

| Failure Type | Description |
|--------------|-------------|
| `Hallucination` | Generates false or made-up information |
| `BiasStereotyping` | Introduces bias or stereotyping in responses |
| `CircularReasoning` | Uses circular reasoning in explanations |
| `ContradictoryInformation` | Provides contradictory information |
| `PlausibleIncorrect` | Provides plausible but incorrect information |
| `Misinterpretation` | Misinterprets the user's request |
| `OverconfidenceUncertainty` | Shows overconfidence about uncertain information |

## Customizing failure types

To test specific failure scenarios, edit the `.devproxy/devproxyrc.json` file and modify the `failures` array. For example, to focus on testing content accuracy issues:

```json
{
  "languageModelFailurePlugin": {
    "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/languagemodelfailureplugin.schema.json",
    "failures": [
      "Hallucination",
      "PlausibleIncorrect",
      "OutdatedInformation",
      "ContradictoryInformation"
    ]
  }
}
```

## Additional failure types

The plugin supports the following additional failure types that you can add to your configuration:

- `AmbiguityVagueness` - Provides ambiguous or vague responses
- `FailureDisclaimHedge` - Uses excessive disclaimers or hedging
- `FailureFollowInstructions` - Fails to follow specific instructions
- `IncorrectFormatStyle` - Provides responses in incorrect format or style
- `OutdatedInformation` - Provides outdated or obsolete information
- `OverSpecification` - Provides unnecessarily detailed responses
- `Overgeneralization` - Makes overly broad generalizations
- `OverreliancePriorConversation` - Over-relies on previous conversation context

## Creating custom failure types

You can create custom failure types by adding `.prompty` files to the `~appFolder/prompts` directory. Name the file `lmfailure_<failure>.prompty` (kebab-case) and reference it in the configuration using PascalCase.

Example `lmfailure_technical-jargon-overuse.prompty`:

```yaml
---
name: Technical Jargon Overuse
model:
  api: chat
sample:
  scenario: Simulate a response that overuses technical jargon.
---

user:
How do I create a simple web page?

user:
You are a language model under evaluation. Your task is to simulate incorrect responses. {{scenario}} Do not try to correct the error.
```

Then add `TechnicalJargonOveruse` to your failures array.

## Features

Using this sample you can use Dev Proxy to:

- Interact with a real chat interface while Dev Proxy simulates LLM failures
- See how failure modes like hallucinations and bias appear in practice
- Test your application's error handling and user experience
- Build more robust and reliable AI-powered applications

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20ai-failure-resilience%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-ai-failure-resilience)
