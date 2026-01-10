# Track API usage analytics

## Summary

This sample demonstrates how to use Dev Proxy to track and analyze API usage patterns. Using the ExecutionSummaryPlugin combined with multiple reporter plugins, you can generate detailed summaries showing which endpoints are used most frequently, response status codes, and timing information across different output formats.

The sample includes a web app that makes API requests to the JSONPlaceholder API, allowing you to interactively generate traffic and see how Dev Proxy tracks usage patterns.

![Dev Proxy tracking API usage analytics](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

* [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 10, 2026|Initial release

## Prerequisites

- [Dev Proxy](https://aka.ms/devproxy)
- [Node.js LTS](https://nodejs.org) (for http-server)

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/api-usage-analytics) then unzip it)
- Navigate to the sample folder: `cd samples/api-usage-analytics`
- Run `npm install` to install dependencies
- Run `npm start` to start Dev Proxy and the web server
- Open http://localhost:3000 in your browser (configure browser to use Dev Proxy at `http://127.0.0.1:8000`)
- Click the API buttons to make requests and see the usage tracked in real-time
- Use "Simulate User Session" to generate a realistic browsing pattern
- Use "Burst 10 Requests" to test rapid request tracking
- Stop Dev Proxy (<kbd>Ctrl</kbd>+<kbd>C</kbd>) to generate the execution summary reports

### Generated Reports

After stopping Dev Proxy, check the generated reports in the current directory:
- `ExecutionSummaryPlugin_PlainTextReporter.txt` - Plain text format
- `ExecutionSummaryPlugin_JsonReporter.json` - JSON format
- `ExecutionSummaryPlugin_MarkdownReporter.md` - Markdown format

## Features

This sample uses Dev Proxy's ExecutionSummaryPlugin to track API usage and generates reports in multiple formats:

**Web App Features:**
* Interactive buttons to call different API endpoints
* Real-time request log showing method, URL, status, and duration
* Live statistics: total requests, success count, errors, and unique endpoints
* "Simulate User Session" - generates realistic browsing patterns
* "Burst 10 Requests" - tests rapid request handling

**Summary Information:**
* Request counts per endpoint
* Response status codes distribution
* Request grouping by URL or message type

**Output Formats:**
* **Plain Text** - Simple, human-readable format for quick review
* **JSON** - Structured data for programmatic analysis and integration
* **Markdown** - Formatted output for documentation and reports

Using this sample you can use Dev Proxy to:

* **Understand API usage patterns** - See which endpoints are called most frequently
* **Identify hotspots** - Find endpoints that might need optimization
* **Track response status codes** - Monitor error rates and success rates
* **Generate multiple report formats** - Choose the format that best fits your workflow
* **Analyze request distribution** - Understand how traffic is distributed across endpoints

## Configuration Options

The sample is configured to group requests by URL (the default). You can change this to group by message type by modifying the `groupBy` property in the `.devproxy/devproxyrc.json` config file:

```json
"executionSummaryPlugin": {
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/executionsummaryplugin.schema.json",
  "groupBy": "messageType"
}
```

Don't forget to add a `configSection` reference to the ExecutionSummaryPlugin when adding custom configuration.

You can also use the command line option: `devproxy --summary-group-by messageType`

To monitor different APIs, update the `urlsToWatch` property:

```json
"urlsToWatch": [
  "https://api.example.com/*",
  "https://graph.microsoft.com/v1.0/*"
]
```

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20api-usage-analytics%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-api-usage-analytics)
