# Dev Proxy Samples Repository Guide

This repository contains configuration presets and mock responses for [Dev Proxy](https://aka.ms/devproxy), a tool for simulating API behaviors during development.

## Repository Architecture

- **`samples/`** - Individual sample configurations, each in its own directory
- **`templates/`** - Template files for creating new samples (`README-template.md`, `sample-template.json`, `metadata-schema.json`)
- Each sample follows a consistent structure: config files, `README.md`, `assets/` folder, and `sample.json` metadata

## Dev Proxy MCP Server

When working with Dev Proxy configurations, use the [Dev Proxy MCP server](https://www.npmjs.com/package/@devproxy/mcp) to access:
- **Latest documentation** - Up-to-date information about Dev Proxy features and capabilities
- **Plugin schemas** - Current JSON schemas for configuring all available plugins
- **Best practices** - Recommended patterns for different use cases

Install with: `npm install -g @devproxy/mcp` or configure it in your MCP-compatible AI assistant for real-time Dev Proxy guidance.

## Sample Structure Patterns

### Configuration Files
- **`devproxyrc.json`** or `*.json` - Main Dev Proxy configuration files using JSON schema validation
- **Schema reference**: `https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v0.29.2/rc.schema.json`
- **Common plugins**: `MockResponsePlugin`, `GenericRandomErrorPlugin`, `RateLimitingPlugin`, `OpenApiSpecGeneratorPlugin`

### Sample Types (via metadata)
- **PRESET**: Pre-configured Dev Proxy settings (`"PRESET": "Yes"`)
- **MOCKS**: API response mock files (`"MOCKS": "Yes"`)
- **PLUGIN**: Custom Dev Proxy plugins (`"PLUGIN": "Yes"`)

### Key Configuration Patterns
```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v0.29.2/rc.schema.json",
  "plugins": [
    {
      "name": "PluginName",
      "enabled": true,
      "pluginPath": "~appFolder/plugins/DevProxy.Plugins.dll"
    }
  ],
  "urlsToWatch": ["https://api.example.com/*"]
}
```

## Sample Creation Workflow

1. **Directory**: Create under `samples/your-sample-name/`
2. **Required files**:
   - Config file(s) with proper schema
   - `README.md` following template structure
   - `assets/sample.json` metadata file
   - `assets/screenshot.png` (1920x1080 preferred)

### README.md Requirements
- Use template from `templates/README-template.md`
- Include compatibility badge: `![Dev Proxy vx.x.x](badge-url)`
- Provide "Minimal path to awesome" steps
- Include tracking pixel: `![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/your-sample-name)`

### Metadata File Structure
- Follow `templates/metadata-schema.json` 
- Required fields: name (pattern: `pnp-devproxy-*`), title, URL, authors, creation/update dates
- Metadata keys indicate sample type: `PRESET`, `MOCKS`, `PLUGIN`, `PROXY VERSION`

## Common Dev Proxy Use Cases

### API Mocking
```json
// Mock file pattern
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v0.29.2/mockresponseplugin.mocksfile.schema.json",
  "responses": [
    {
      "request": { "url": "https://api.example.com/*" },
      "response": { "statusCode": 200, "body": {...} }
    }
  ]
}
```

### Error Simulation
- Random errors: `GenericRandomErrorPlugin` with custom error files
- Rate limiting: `RateLimitingPlugin` with quotas and retry headers
- Throttling: Custom response delays and 429 status codes

### API Analysis
- OpenAPI spec generation: `OpenApiSpecGeneratorPlugin` with `--record` flag
- Security analysis: Permission validation and minimal access patterns

## Development Commands

- **Start with config**: `devproxy --config-file sample-config.json`
- **Watch specific URLs**: `devproxy --urls-to-watch "https://api.example.com/*"`
- **Record mode**: `devproxy --config-file config.json --record`
- **Multiple configs**: Different files for different scenarios (daily limits, rate limits, etc.)

## Naming Conventions

- Sample folders: `kebab-case` descriptive names
- Config files: Match functionality (`rate-limiting.json`, `errors.json`)
- Metadata names: `pnp-devproxy-{sample-folder-name}`
- Assets: `screenshot.png`, descriptive error/mock file names

## Microsoft Graph Samples

Special patterns for Graph API samples:
- **URL patterns**: `https://graph.microsoft.com/v1.0/*`, `https://graph.microsoft.com/beta/*`
- **Plugin**: `GraphMockResponsePlugin` for Graph-specific mocking
- **Multi-version**: Separate configs for v1.0 vs beta endpoints
- **Permission demos**: Minimal permission and security-focused samples

When contributing, ensure your sample demonstrates a specific Dev Proxy capability with real-world applicability and follows the established file structure and naming patterns.
