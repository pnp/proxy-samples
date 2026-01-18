---
name: upgrade-devproxy-sample
description: This skill should be used when the user asks to "upgrade a sample", "update to new Dev Proxy version", "bump the version", "update schemas", or needs to upgrade existing Dev Proxy samples to a new version with updated schemas and documentation.
---

# Upgrade Dev Proxy Sample

This skill guides upgrading existing Dev Proxy samples to a new version, ensuring all schemas, metadata, and documentation are properly updated.

## Before Starting

Use Dev Proxy MCP tools to:
- Get the current/target schema version
- Check for any breaking changes in schemas
- Understand new requirements

## Files to Update

Every upgrade must update these locations:

1. **All config JSON files** - Schema URLs
2. **assets/sample.json** - `PROXY VERSION` and `updateDateTime`
3. **README.md** - Badge and version history table

## Step 1: Update Configuration Files

### Find All Config Files

Dev Proxy config files are in `.devproxy/` folder:
```bash
grep -r "dev-proxy/main/schemas" samples/{sample-name}/.devproxy/ --include="*.json"
```

### Update Schema URLs

Change version in `$schema` URLs:

**Before:**
```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v1.0.0/rc.schema.json"
}
```

**After:**
```json
{
  "$schema": "https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/v2.0.0/rc.schema.json"
}
```

### Schema Types to Update

Different files use different schemas:
- `devproxyrc.json` → `rc.schema.json`
- Mock response files → `mockresponseplugin.mocksfile.schema.json`
- Error files → `genericrandomerrorplugin.errorsfile.schema.json`
- Plugin configs → `{pluginname}.schema.json`

**Important**: Match schema type to file purpose:
- `.schema.json` = plugin configuration (has `mocksFile`, `errorsFile` properties)
- `.mocksfile.schema.json` = actual mock data (has `mocks` array)
- `.errorsfile.schema.json` = actual error data (has `errors` array)

### Don't Forget Plugin Config Sections

Dev Proxy configs often have **embedded plugin config sections** with their own `$schema`:

```json
{
  "$schema": ".../rc.schema.json",
  "plugins": [...],
  "languageModelFailurePlugin": {
    "$schema": ".../languagemodelfailureplugin.schema.json",  // ← Update this too!
    "failures": [...]
  }
}
```

Update ALL `$schema` URLs in the file, not just the top-level one.

## Step 2: Update Metadata (assets/sample.json)

Update two fields:

```json
{
  "metadata": [
    { "key": "PROXY VERSION", "value": "v2.0.0" }
  ],
  "updateDateTime": "2026-01-18"
}
```

**Rules:**
- Date format: `YYYY-MM-DD` (not ISO timestamp)
- Preserve all other formatting (use sed for surgical changes)
- For pre-release samples (not yet merged), also update `creationDateTime`

## Step 3: Update README.md

### Update Compatibility Badge

**Before:**
```markdown
![Dev Proxy v1.0.0](https://aka.ms/devproxy/badge/v1.0.0)
```

**After:**
```markdown
![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)
```

### Update Version History Table

**For samples already in main** (add new version):
```markdown
Version|Date|Comments
-------|----|--------
1.1|January 18, 2026|Updated to Dev Proxy v2.0.0
1.0|December 15, 2025|Initial release
```

**For pre-release samples** (update v1.0 date):
```markdown
Version|Date|Comments
-------|----|--------
1.0|January 18, 2026|Initial release
```

## Step 4: Validate Changes

Use the **validate-devproxy-sample** skill to verify:
- All `$schema` URLs are valid
- Plugin config sections have schemas
- No schema validation errors
- Dates are consistent

## Batch Upgrade Multiple Samples

To upgrade all samples to a new version:

```bash
# Find all files with old schema version (in .devproxy folders)
grep -rl "schemas/v1.0.0" samples/*/.devproxy/ --include="*.json"

# Update schemas (example with sed)
find samples/*/.devproxy -name "*.json" -exec grep -l "schemas/v1.0.0" {} \; | \
  xargs sed -i '' 's|schemas/v1.0.0|schemas/v2.0.0|g'
```

Then manually update each sample's:
- `assets/sample.json` dates and version
- `README.md` badge and version history

## Checklist

For each sample being upgraded:

- [ ] All `$schema` URLs updated (including plugin config sections)
- [ ] `PROXY VERSION` updated in `assets/sample.json`
- [ ] `updateDateTime` updated (YYYY-MM-DD format)
- [ ] README badge updated
- [ ] Version history entry added/updated
- [ ] Run **validate-devproxy-sample** skill to verify

## Quick Reference

### Schema URL Pattern
```
https://raw.githubusercontent.com/dotnet/dev-proxy/main/schemas/{version}/{schema-file}
```

### Common Schema Files
| File Type | Schema |
|-----------|--------|
| Main config | `rc.schema.json` |
| Mock responses | `mockresponseplugin.mocksfile.schema.json` |
| Random errors | `genericrandomerrorplugin.errorsfile.schema.json` |
| Rate limiting | `ratelimitingplugin.schema.json` |
