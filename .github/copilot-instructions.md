# Dev Proxy Samples Repository Guide

This repository contains configuration presets and mock responses for [Dev Proxy](https://aka.ms/devproxy), a tool for simulating API behaviors during development.

## Repository Architecture

- **`samples/`** - Individual sample configurations, each in its own directory
- **`templates/`** - Template files for creating new samples (`README-template.md`, `sample-template.json`, `metadata-schema.json`)
- Each sample follows a consistent structure: config files, `README.md`, `assets/` folder, and `sample.json` metadata

## Dev Proxy MCP Server

When working with Dev Proxy configurations, **you MUST use the [Dev Proxy MCP server](https://www.npmjs.com/package/@devproxy/mcp)** tools to access:
- **Latest documentation** - Up-to-date information about Dev Proxy features and capabilities
- **Plugin schemas** - Current JSON schemas for configuring all available plugins
- **Best practices** - Recommended patterns for different use cases

Install with: `npm install -g @devproxy/mcp` or configure it in your MCP-compatible AI assistant for real-time Dev Proxy guidance.

> **⚠️ CRITICAL**: Do NOT create samples based on general knowledge or training data. Always call the Dev Proxy MCP tools first to get current schemas, best practices, and documentation. Samples created without using MCP tools will be rejected.

## Sample Creation Best Practices

### Schema Versions
- **Always check current schema version** using the Dev Proxy MCP server
- Use the latest available schema version (e.g., `v1.0.0` not `v0.29.2`)
- Apply same version to both `devproxyrc.json` and plugin-specific schemas

### Testing Instructions
- **Proxy configuration required**: Dev Proxy runs as a local proxy, so curl commands must explicitly use it
- **Correct curl syntax**: Use `curl -ikx http://127.0.0.1:8000 <url>` for testing
  - `-i`: Include response headers in output
  - `-k`: Allow insecure connections (for SSL certificate issues)
  - `-x http://127.0.0.1:8000`: Route through Dev Proxy on localhost:8000
- **Never use**: `curl <url>` without proxy configuration - this bypasses Dev Proxy entirely

### Demo Apps Over Repeated Curl Commands
- **Prefer demo applications**: When a sample demonstrates behavior that would require multiple curl commands (e.g., rate limiting, throttling, retry logic), create a simple demo app instead
- **Good demo app examples**: Simple HTML+JavaScript page, Node.js script, Python script that makes API calls in a loop
- **Why**: Demo apps show the sample in action more effectively than asking users to run curl 10+ times manually
- **When curl is OK**: Single request/response demonstrations, quick verification steps

## Sample Structure Patterns

### Configuration Files
- **`devproxyrc.json`** or `*.json` - Main Dev Proxy configuration files using JSON schema validation
- **Schema reference**: Always use latest version from Dev Proxy MCP server
- **Common plugins**: `MockResponsePlugin`, `GenericRandomErrorPlugin`, `RateLimitingPlugin`, `OpenApiSpecGeneratorPlugin`

### Sample Types (via metadata)
- **PRESET**: Reusable Dev Proxy configurations you can apply across APIs (for example, a config for generating OpenAPI specs where the target URL is provided via command-line args) (`"PRESET": "Yes"`)
- **MOCKS**: API response mock files (`"MOCKS": "Yes"`)
- **PLUGIN**: Custom Dev Proxy plugins (`"PLUGIN": "Yes"`)

### Key Configuration Patterns
```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v1.0.0/rc.schema.json",
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
   - Config file(s) with proper schema (check current version via MCP)
   - `README.md` following template structure
   - `assets/sample.json` metadata file (follow existing samples)
   - `assets/screenshot.png` (1920x1080 preferred) or placeholder README

### README.md Requirements
- Use template from `templates/README-template.md`
- Include compatibility badge with current version: `![Dev Proxy vx.x.x](badge-url)`
- Provide "Minimal path to awesome" steps with correct curl syntax
- Include tracking pixel: `![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/your-sample-name)`
- **No test scripts**: Other samples don't include test scripts, so don't create them

### Metadata File Structure (`assets/sample.json`)
- **Examine existing samples** to understand the correct structure
- **Preserve formatting**: Never reformat JSON files - only change values, not structure
- **Date format**: Use `YYYY-MM-DD` format (e.g., `"2026-01-05"`), NOT ISO timestamps
- **Required fields**: 
  - `name` (pattern: `pnp-devproxy-*`)
  - `source: "pnp"`
  - `title`, `shortDescription`
  - `url` (full GitHub URL) and `downloadUrl` (pnp.github.io URL)
  - `longDescription` (array with exactly one string element, same content as `shortDescription`)
  - **shortDescription vs longDescription**: Both must have identical content. `shortDescription` is a plain string, `longDescription` is an array containing that same string as its only element (e.g., `"shortDescription": "Foo bar"` and `"longDescription": ["Foo bar"]`)
  - `creationDateTime`, `updateDateTime` (both in `YYYY-MM-DD` format)
  - `products: ["Dev Proxy"]`
  - Complete `metadata` section with `SAMPLE ID`, `PRESET`, `MOCKS`, `PLUGIN`, `PROXY VERSION`
  - `thumbnails` with full GitHub URL
  - `authors` with current user's details: `gitHubAccount`, `pictureUrl`, `name`
  - `references` section with relevant Dev Proxy documentation

## Common Dev Proxy Use Cases

### API Mocking
```json
// Mock file pattern
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v1.0.0/mockresponseplugin.mocksfile.schema.json",
  "mocks": [
    {
      "request": { "url": "https://api.example.com/*" },
      "response": { 
        "statusCode": 200, 
        "headers": [
          {"name": "x-powered-by", "value": "Dev Proxy"},
          {"name": "x-mocked-by", "value": "Dev Proxy MockResponsePlugin"}
        ],
        "body": {...} 
      }
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

- **Default config**: Just run `devproxy` — it automatically loads `devproxyrc.json` from the current directory, or falls back to the one in the Dev Proxy installation directory if not found. Full resolution order:
  1. Current directory: `devproxyrc.jsonc`, then `devproxyrc.json`
  2. `.devproxy` subfolder: `.devproxy/devproxyrc.jsonc`, then `.devproxy/devproxyrc.json`
  3. Dev Proxy installation directory: `devproxyrc.jsonc`, then `devproxyrc.json`
- **Custom config file**: `devproxy --config-file custom-config.json` (only needed for non-default filenames)
- **Watch specific URLs**: `devproxy --urls-to-watch "https://api.example.com/*"`
- **Record mode**: `devproxy --record`
- **Multiple configs**: Different files for different scenarios (daily limits, rate limits, etc.)

> **⚠️ IMPORTANT**: Never use any of the default config filenames with `--config-file` (for example: `devproxyrc.jsonc` or `devproxyrc.json`). Dev Proxy automatically loads the default filenames and paths, so just use `devproxy`.

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

## Upgrading Samples to a New Dev Proxy Version

When upgrading samples to a new Dev Proxy version, update ALL of the following:

### 1. Configuration Files (ALL `.json` files with Dev Proxy schemas)
- Update `$schema` URLs to the new version in every config file
- **Schema naming matters**:
  - `mockresponseplugin.schema.json` = plugin config file (requires `mocksFile` property)
  - `mockresponseplugin.mocksfile.schema.json` = mocks data file (requires `mocks` array)
  - Similar pattern for other plugins (e.g., `genericrandomerrorplugin.schema.json` vs `genericrandomerrorplugin.errorsfile.schema.json`)
- **Validate against schemas**: After updating, validate all config files against their schemas to catch breaking changes (e.g., `null` values that are no longer allowed)

### 2. Metadata (`assets/sample.json`)
- Update `PROXY VERSION` value (e.g., `"value": "v2.0.0"`)
- Update `updateDateTime` to current date in `YYYY-MM-DD` format
- **Preserve formatting**: Use sed or similar to change only values, not JSON structure

### 3. README.md
- Update compatibility badge: `![Dev Proxy vX.X.X](https://aka.ms/devproxy/badge/vX.X.X)`
- Add version history entry with format: `X.X|Month DD, YYYY|Updated to Dev Proxy vX.X.X`

### Schema Validation
Use `ajv-cli` to validate config files against their schemas:
```bash
npm install -g ajv-cli

# Validate all Dev Proxy config files in a sample directory
find . -name "*.json" -not -path "*/assets/*" | while read f; do
  schema_url=$(grep -m1 '"\$schema"' "$f" 2>/dev/null | grep -o 'https://[^"]*')
  if [[ "$schema_url" == *"dev-proxy"* ]]; then
    echo "Validating $f"
    ajv validate -s <(curl -s "$schema_url") -d "$f" || echo "FAILED: $f"
  fi
done
```

### Post-Upgrade Verification
After upgrading, use VS Code's **Problems panel** (or `get_errors` tool) to confirm there are no schema validation issues across all modified files before considering the upgrade complete.

### Common Schema Issues When Upgrading
- `body: null` may not be allowed (use `body: ""` instead)
- New required properties may be added
- Property types may become stricter

## Common Mistakes to Avoid

### PRESET Metadata
- **PRESET should be "No"** for most samples
- Only set `"PRESET": "Yes"` if the sample is **reusable for other purposes** (e.g., a generic configuration that developers can apply to their own APIs)
- Having a `devproxyrc.json` config file does NOT automatically make it a preset

### Startup Commands
- `.devproxy/devproxyrc.json` is a **default path** that Dev Proxy looks for automatically
- When config is in `.devproxy/devproxyrc.json`, the startup command should just be `devproxy` (no `--config-file` needed)
- Only use `--config-file` when the config file is in a non-default location or has a non-default name

### Updating Dates
- When updating sample dates, **always update both files**:
  - `assets/sample.json`: Update `updateDateTime` field
  - `README.md`: Update the version history table with the new date
- Dates must stay in sync between these two files
- **Pre-release updates** (sample not yet merged to main):
  - Update both `creationDateTime` and `updateDateTime` in `sample.json`
  - Update the v1.0 date in the README version history table
- **Post-release updates** (sample already in main):
  - Only update `updateDateTime` in `sample.json`
  - Add a new version entry (e.g., 1.1) to the README version history table
