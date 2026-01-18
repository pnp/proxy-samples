# Dev Proxy Samples Repository Guide

This repository contains configuration presets and mock responses for [Dev Proxy](https://aka.ms/devproxy), a tool for simulating API behaviors during development.

## Repository Architecture

- **`samples/`** - Individual sample configurations, each in its own directory
- **`templates/`** - Template files for creating new samples
- **`.github/skills/`** - Detailed workflow guides for common tasks
- Each sample follows a consistent structure: `.devproxy/` config folder, `README.md`, `assets/` folder with `sample.json` metadata

## Dev Proxy MCP Server

When working with Dev Proxy configurations, **you MUST use the [Dev Proxy MCP server](https://www.npmjs.com/package/@devproxy/mcp)** tools to access:
- **Latest documentation** - Up-to-date information about Dev Proxy features and capabilities
- **Plugin schemas** - Current JSON schemas for configuring all available plugins
- **Best practices** - Recommended patterns for different use cases

> **⚠️ CRITICAL**: Do NOT create samples based on general knowledge or training data. Always call the Dev Proxy MCP tools first to get current schemas, best practices, and documentation.

## Skills for Common Tasks

This repository includes detailed skills for specific workflows. Use these for step-by-step guidance:

| Task | Skill File |
|------|------------|
| Create a new sample | `.github/skills/create-devproxy-sample/SKILL.md` |
| Upgrade samples to new Dev Proxy version | `.github/skills/upgrade-devproxy-sample/SKILL.md` |
| Validate a sample before submission | `.github/skills/validate-devproxy-sample/SKILL.md` |

## Quick Reference

### Sample Directory Structure

```
samples/{sample-name}/
├── .devproxy/
│   ├── devproxyrc.json      # Main config
│   └── [mocks.json, etc.]   # Additional config files
├── README.md
├── assets/
│   ├── sample.json          # Metadata for samples gallery
│   └── screenshot.png
└── [demo app files]         # If needed
```

### Key Rules

- **Config location**: All Dev Proxy files go in `.devproxy/` folder
- **Startup command**: Just `devproxy` (not `devproxy --config-file ...`)
- **curl syntax**: Always `curl -ikx http://127.0.0.1:8000 <url>`
- **Schema versions**: Same version across all `$schema` URLs (including plugin config sections)
- **Descriptions**: `shortDescription` must equal `longDescription[0]`
- **Dates**: `YYYY-MM-DD` format, must match between `sample.json` and README
- **PRESET**: Usually `"No"` unless truly reusable for other APIs

### Sample Types (metadata)

- `PRESET: "Yes"` - Reusable config for any API
- `MOCKS: "Yes"` - Includes mock response files
- `PLUGIN: "Yes"` - Custom Dev Proxy plugin

### Development Commands

```bash
devproxy                                    # Load from .devproxy/devproxyrc.json
devproxy --config-file custom.json          # Only for non-default filenames
devproxy --urls-to-watch "https://api.example.com/*"
devproxy --record
```

## Code Review Instructions

When performing a code review on PRs that add or modify samples, apply the checks in `.github/skills/validate-devproxy-sample/SKILL.md`.
