---
name: validate-devproxy-sample
description: This skill should be used when the user asks to "validate a sample", "check my sample", "review before submitting", "verify sample structure", or needs to validate a Dev Proxy sample for correctness before submission.
---

# Validate Dev Proxy Sample

This skill guides validation of Dev Proxy samples to catch common mistakes before submission. Run through these checks to ensure the sample meets repository standards.

> **⚠️ MANDATORY**: You MUST run `ajv` to validate all JSON files against their schemas. Do NOT skip this step or rely on VS Code's JSON validation alone — it misses errors that Dev Proxy will catch at runtime. Install ajv-cli first: `npm install -g ajv-cli`

## Quick Validation Command

To validate schemas programmatically (Dev Proxy uses JSON Schema 2020-12):
```bash
# Validate main config file against its schema
sample="samples/{sample-name}"
f="$sample/.devproxy/devproxyrc.json"
schema_url=$(grep -m1 '"\$schema"' "$f" | grep -o 'https://[^"]*')
curl -s "$schema_url" > "$sample/.devproxy/.tmp-schema.json"
ajv validate --spec=draft2020 --strict=false -s "$sample/.devproxy/.tmp-schema.json" -d "$f"
rm "$sample/.devproxy/.tmp-schema.json"
```

**Note**: Install ajv-cli first with `npm install -g ajv-cli`. The `--spec=draft2020 --strict=false` flags are required for Dev Proxy schemas.

### Validating Plugin Config Sections

Dev Proxy configs have embedded plugin config sections with their own `$schema`. Extract and validate each:

```bash
sample="samples/{sample-name}"
f="$sample/.devproxy/devproxyrc.json"

# List all config section names that end with "Plugin"
jq -r 'keys[] | select(endswith("Plugin"))' "$f" | while read -r section; do
  schema_url=$(jq -r ".\"$section\".\"\$schema\" // empty" "$f")
  if [[ -n "$schema_url" ]]; then
    echo "Validating $section..."
    jq ".\"$section\"" "$f" > "$sample/.devproxy/.tmp-config.json"
    curl -s "$schema_url" > "$sample/.devproxy/.tmp-schema.json"
    ajv validate --spec=draft2020 --strict=false -s "$sample/.devproxy/.tmp-schema.json" -d "$sample/.devproxy/.tmp-config.json" || echo "❌ FAILED: $section"
    rm "$sample/.devproxy/.tmp-config.json" "$sample/.devproxy/.tmp-schema.json"
  fi
done
```

### Validate All Standalone Files

```bash
sample="samples/{sample-name}"

for f in "$sample"/.devproxy/*.json; do
  [[ "$(basename "$f")" == "devproxyrc.json" ]] && continue  # Skip main config
  [[ "$(basename "$f")" == .tmp-* ]] && continue  # Skip temp files
  schema_url=$(grep -m1 '"\$schema"' "$f" 2>/dev/null | grep -o 'https://[^"]*')
  if [[ "$schema_url" == *"dev-proxy"* ]]; then
    echo "Validating $f..."
    curl -s "$schema_url" > "$sample/.devproxy/.tmp-schema.json"
    ajv validate --spec=draft2020 --strict=false -s "$sample/.devproxy/.tmp-schema.json" -d "$f" || echo "❌ FAILED: $f"
    rm "$sample/.devproxy/.tmp-schema.json"
  fi
done
```

## Validation Checklist

### 1. Directory Structure

Verify required files exist:
```
samples/{sample-name}/
├── .devproxy/
│   ├── devproxyrc.json                  ✓
│   └── [mocks.json, errors.json, etc.]  (if needed)
├── README.md                            ✓
└── assets/
    └── sample.json                      ✓
```

**Important**: All Dev Proxy config files go in `.devproxy/` folder.

### 2. Schema Validation

**Check**: Every Dev Proxy config file has a `$schema` defined.

**Required schemas:**
- Main config file (`devproxyrc.json`) must have `$schema`
- Each plugin config section must have its own `$schema`
- Standalone data files (mocks, errors) must have `$schema`

**Exception**: CRUD API data files don't require schemas.

**Example of proper schema coverage:**
```json
{
  "$schema": ".../rc.schema.json",           // ✓ Main config schema
  "plugins": [...],
  "mockResponsePlugin": {
    "$schema": ".../mockresponseplugin.schema.json",  // ✓ Plugin config schema
    "mocksFile": "mocks.json"
  }
}
```

**Check**: All `$schema` URLs validate against their schemas.

**Common issues:**
- Missing `$schema` on main config file
- Missing `$schema` on plugin config sections
- Wrong schema version (use MCP to get current)
- Wrong schema type:
  - `mockresponseplugin.schema.json` = plugin config (needs `mocksFile`)
  - `mockresponseplugin.mocksfile.schema.json` = mock data (needs `mocks` array)
- `body: null` not allowed (use `body: ""`)
- Missing required fields

### 3. Metadata Validation (assets/sample.json)

| Field | Check |
|-------|-------|
| `name` | Matches `pnp-devproxy-{folder-name}` |
| `source` | Is `"pnp"` |
| `url` | Matches `https://github.com/pnp/proxy-samples/tree/main/samples/{folder-name}` |
| `downloadUrl` | Matches `https://pnp.github.io/download-partial/?url=...` |
| `shortDescription` | Non-empty, describes the sample |
| `longDescription[0]` | **Identical** to `shortDescription` |
| `creationDateTime` | Format `YYYY-MM-DD` |
| `updateDateTime` | Format `YYYY-MM-DD` |
| `products` | Contains `["Dev Proxy"]` |
| `SAMPLE ID` | Matches folder name |
| `PROXY VERSION` | Matches README badge version |
| `thumbnails[0].url` | Points to existing screenshot or has placeholder |
| `authors` | Has at least one author with `gitHubAccount`, `name` |

### 4. PRESET Metadata

**Check**: Is `PRESET` value correct?

- `"Yes"` = Sample is **reusable for other APIs** (generic config)
- `"No"` = Sample is specific to a particular API or scenario

**Common mistake**: Setting PRESET to "Yes" just because it has a config file. Most samples should be "No".

### 5. README Validation

| Element | Check |
|---------|-------|
| Title | Descriptive, not technical |
| Summary | Explains what and why |
| Screenshot | Exists or has placeholder |
| Badge URL | Must use `https://aka.ms/devproxy/badge/vX.X.X` (not shields.io) |
| Badge version | Matches `PROXY VERSION` in sample.json |
| Contributors | GitHub profile links |
| Version history | Date matches `updateDateTime` in sample.json |
| Minimal path | Steps are complete and correct |
| Startup command | Correct (see below) |
| curl commands | Include `-ikx http://127.0.0.1:8000` |
| Tracking pixel | `![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-{sample-name})` |

### 6. Startup Command Validation

**Check**: Is the startup command correct?

**Default config locations** (just use `devproxy`):
- `devproxyrc.json`
- `devproxyrc.jsonc`
- `.devproxy/devproxyrc.json`
- `.devproxy/devproxyrc.jsonc`

**Custom config** (use `devproxy --config-file custom.json`):
- Any other filename or location

**Common mistake**: Using `devproxy --config-file devproxyrc.json` — unnecessary!

### 7. Date Consistency

**Check**: Dates match between files.

| Location | Format | Example |
|----------|--------|---------|
| `sample.json` → `updateDateTime` | `YYYY-MM-DD` | `2026-01-18` |
| README → Version history | `Month DD, YYYY` | `January 18, 2026` |

Both should represent the same date.

### 8. curl Command Validation

**Check**: All curl commands route through Dev Proxy.

**Correct:**
```bash
curl -ikx http://127.0.0.1:8000 https://api.example.com/endpoint
```

**Incorrect:**
```bash
curl https://api.example.com/endpoint  # Bypasses Dev Proxy!
```

Flags explained:
- `-i` = Include response headers
- `-k` = Allow insecure (for SSL issues)
- `-x http://127.0.0.1:8000` = Route through proxy

### 9. Demo App vs curl

**Check**: For scenarios requiring multiple requests, is there a demo app?

Use demo app when:
- Rate limiting (needs many requests)
- Retry logic testing
- Throttling scenarios
- Any behavior requiring loops

Acceptable curl when:
- Single request/response
- Quick verification

### 10. URL Domain Validation

**Check**: Do URLs use proxy-friendly domains?

**Avoid these TLDs** — they're often excluded from system proxy settings:
- `.local` — Reserved for mDNS/Bonjour, typically bypasses proxy
- `.localhost` — Loopback, excluded by most systems
- `.internal` — Often excluded in enterprise environments
- `.test` — Reserved TLD, may have issues

**Use instead:**
- `.contoso.com` — Microsoft's example domain (safe, won't resolve)
- `.example.com` — IANA reserved for documentation
- `.fabrikam.com` — Another Microsoft example domain
- Real API domains you're mocking

**Why this matters**: When browsers/apps detect `.local` domains, they often skip the proxy entirely, making Dev Proxy unable to intercept requests.

**Check in files:**
- `urlsToWatch` in `devproxyrc.json`
- `baseUrl` in CRUD API files
- API URLs in frontend code (JavaScript, HTML)
- Mock response URLs

## Common Mistakes Summary

| Mistake | How to Fix |
|---------|------------|
| Missing `$schema` on main config | Add `$schema` to `devproxyrc.json` |
| Missing `$schema` on plugin config section | Add `$schema` to each plugin config section |
| `PRESET: "Yes"` for specific samples | Change to `"No"` unless truly reusable |
| `--config-file devproxyrc.json` | Remove `--config-file`, just use `devproxy` |
| Config files not in `.devproxy/` | Move all Dev Proxy files to `.devproxy/` folder |
| `shortDescription` ≠ `longDescription[0]` | Make them identical |
| Wrong date format | Use `YYYY-MM-DD` in JSON, `Month DD, YYYY` in README |
| Dates don't match | Sync dates between sample.json and README |
| curl without proxy | Add `-ikx http://127.0.0.1:8000` |
| Wrong schema type | Match schema to file purpose |
| Missing tracking pixel | Add at end of README |
| Using `.local` TLD | Change to `.contoso.com` or similar |
| Wrong badge URL (shields.io) | Use `https://aka.ms/devproxy/badge/vX.X.X` |

## Validation Script

Run this to check common issues:

```bash
sample="samples/{sample-name}"

# Check required files
echo "=== Required Files ==="
[ -d "$sample/.devproxy" ] && echo "✓ .devproxy/" || echo "✗ .devproxy/ folder missing"
[ -f "$sample/.devproxy/devproxyrc.json" ] && echo "✓ .devproxy/devproxyrc.json" || echo "✗ .devproxy/devproxyrc.json missing"
[ -f "$sample/README.md" ] && echo "✓ README.md" || echo "✗ README.md missing"
[ -f "$sample/assets/sample.json" ] && echo "✓ assets/sample.json" || echo "✗ assets/sample.json missing"

# Check metadata name matches folder
echo -e "\n=== Metadata Check ==="
folder=$(basename "$sample")
name=$(grep -o '"name": "[^"]*"' "$sample/assets/sample.json" | head -1 | cut -d'"' -f4)
expected="pnp-devproxy-$folder"
[ "$name" = "$expected" ] && echo "✓ name matches folder" || echo "✗ name '$name' should be '$expected'"

# Check date format
echo -e "\n=== Date Format ==="
grep -E '"(creation|update)DateTime"' "$sample/assets/sample.json" | grep -qE '[0-9]{4}-[0-9]{2}-[0-9]{2}' && echo "✓ Date format OK" || echo "✗ Check date format"

# Check shortDescription equals longDescription
echo -e "\n=== Description Match ==="
short=$(grep '"shortDescription"' "$sample/assets/sample.json" | cut -d'"' -f4)
long=$(grep -A1 '"longDescription"' "$sample/assets/sample.json" | tail -1 | tr -d '[]"' | xargs)
[ "$short" = "$long" ] && echo "✓ Descriptions match" || echo "✗ shortDescription ≠ longDescription[0]"

# Check tracking pixel
echo -e "\n=== Tracking Pixel ==="
grep -q "m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-$folder" "$sample/README.md" && echo "✓ Tracking pixel OK" || echo "✗ Missing/wrong tracking pixel"

# Check badge URL uses aka.ms
echo -e "\n=== Badge URL ==="
grep -q "https://aka.ms/devproxy/badge/" "$sample/README.md" && echo "✓ Badge uses aka.ms" || echo "✗ Badge should use https://aka.ms/devproxy/badge/vX.X.X"
```

## Pre-Submission Final Check

Before creating a PR:

1. [ ] **Run ajv validation on ALL JSON files** (mandatory — don't skip!)
2. [ ] Dev Proxy config files are in `.devproxy/` folder
3. [ ] All JSON files pass schema validation
4. [ ] Metadata name = `pnp-devproxy-{folder-name}`
5. [ ] Descriptions match (short = long[0])
6. [ ] Dates are in correct format and match
7. [ ] PRESET is correct (usually "No")
8. [ ] Startup command is correct
9. [ ] curl commands include proxy flag
10. [ ] README has tracking pixel
11. [ ] Badge uses `https://aka.ms/devproxy/badge/vX.X.X`
12. [ ] Badge version matches PROXY VERSION
13. [ ] URLs don't use `.local` or other excluded TLDs
14. [ ] VS Code shows no Problems
