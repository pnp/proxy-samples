---
name: create-devproxy-sample
description: This skill should be used when the user asks to "create a sample", "add a new sample", "make a Dev Proxy sample", "start a new sample", "scaffold a sample", or needs to create a new Dev Proxy sample with proper structure, config files, metadata, and README.
---

# Create Dev Proxy Sample

This skill guides creating new Dev Proxy samples for the pnp/proxy-samples repository with correct structure, schemas, metadata, and documentation.

## Before Starting

**Critical**: Always use the Dev Proxy MCP server tools to get:
- Current schema versions (never guess)
- Plugin configurations and options
- Best practices for the specific use case

Call `mcp_dev_proxy_GetBestPractices` and relevant schema tools before creating any config files.

## Sample Directory Structure

Create the sample in `samples/{sample-name}/`:

```
samples/{sample-name}/
├── .devproxy/
│   ├── devproxyrc.json      # Main config
│   ├── mocks.json           # Mock files (if needed)
│   └── errors.json          # Error files (if needed)
├── README.md                # Documentation
├── assets/
│   ├── sample.json          # Metadata for samples gallery
│   └── screenshot.png       # 1920x1080 screenshot (or placeholder note)
└── [demo app files]         # Demo apps if needed (index.html, etc.)
```

**Important**: All Dev Proxy configuration files go in the `.devproxy/` folder for clarity.

## Step 1: Create Configuration Files

All Dev Proxy config files go in `.devproxy/` folder.

### Main Config (.devproxy/devproxyrc.json)

```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/rc.schema.json",
  "plugins": [
    {
      "name": "PluginName",
      "enabled": true,
      "pluginPath": "~appFolder/plugins/DevProxy.Plugins.dll",
      "configSection": "pluginConfig"
    }
  ],
  "urlsToWatch": ["https://api.example.com/*"],
  "pluginConfig": {
    "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/pluginname.schema.json",
    "option": "value"
  }
}
```

**Schema rules** (get current version from MCP):
- Every config file needs `$schema`
- Every plugin config section needs its own `$schema`
- Use same version across ALL `$schema` URLs

### Mock Files (.devproxy/mocks.json)

```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/mockresponseplugin.mocksfile.schema.json",
  "mocks": [
    {
      "request": { "url": "https://api.example.com/endpoint" },
      "response": {
        "statusCode": 200,
        "headers": [
          { "name": "content-type", "value": "application/json" }
        ],
        "body": { "key": "value" }
      }
    }
  ]
}
```

## Step 2: Create Metadata (assets/sample.json)

```json
[
  {
    "name": "pnp-devproxy-{sample-name}",
    "source": "pnp",
    "title": "Friendly Sample Title",
    "shortDescription": "Clear description of what the sample does and why it's useful.",
    "url": "https://github.com/pnp/proxy-samples/tree/main/samples/{sample-name}",
    "downloadUrl": "https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/{sample-name}",
    "longDescription": [
      "Clear description of what the sample does and why it's useful."
    ],
    "creationDateTime": "YYYY-MM-DD",
    "updateDateTime": "YYYY-MM-DD",
    "products": ["Dev Proxy"],
    "metadata": [
      { "key": "SAMPLE ID", "value": "{sample-name}" },
      { "key": "PRESET", "value": "No" },
      { "key": "MOCKS", "value": "No" },
      { "key": "PLUGIN", "value": "No" },
      { "key": "PROXY VERSION", "value": "v2.0.0" }
    ],
    "thumbnails": [
      {
        "type": "image",
        "order": 100,
        "url": "https://github.com/pnp/proxy-samples/raw/main/samples/{sample-name}/assets/screenshot.png",
        "alt": "Description of screenshot"
      }
    ],
    "authors": [
      {
        "gitHubAccount": "username",
        "pictureUrl": "https://github.com/username.png",
        "name": "Full Name"
      }
    ],
    "references": [
      {
        "name": "Get started with the Dev Proxy",
        "description": "The tutorial will introduce you to the Dev Proxy and show you how to use its features.",
        "url": "https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started"
      }
    ]
  }
]
```

**Key metadata rules** (see **validate-devproxy-sample** skill for full validation):
- `name`: Always `pnp-devproxy-{folder-name}`
- `shortDescription` and `longDescription[0]`: Must be identical
- Dates: `YYYY-MM-DD` format
- `PRESET`: Usually "No" ("Yes" only if reusable for other APIs)

## Step 3: Create README.md

Use this structure (see `templates/README-template.md` for full template):

```markdown
# Friendly Sample Title

## Summary

What the sample does and why it's useful.

![Screenshot description](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Name](https://github.com/username)

## Version history

Version|Date|Comments
-------|----|--------
1.0|Month DD, YYYY|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/{sample-name}) then unzip it)
- Start Dev Proxy: `devproxy`
- Test with: `curl -ikx http://127.0.0.1:8000 https://api.example.com/endpoint`

## Features

Using this sample you can:

- Feature 1
- Feature 2

## Help

[Standard help section - see template]

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND...**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-{sample-name})
```

## Key Rules

- **Startup command**: Just `devproxy` (configs in `.devproxy/` are auto-detected)
- **curl commands**: Always include `-ikx http://127.0.0.1:8000`
- **Demo apps**: Use for multi-request scenarios (rate limiting, retry logic)

## Validation

Before finalizing, use the **validate-devproxy-sample** skill to check:
- Schema validation (all files and plugin config sections)
- Metadata correctness
- README requirements
- Common mistakes
