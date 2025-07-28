# Dev Proxy LLM Usage Test Project

## Architecture Overview

This is a **Dev Proxy test application** that demonstrates LLM usage monitoring and cost tracking. The app fetches feedback from a mock API, uses OpenAI's GPT-4.1 to categorize feedback, and displays results with visual "pills" - all while Dev Proxy intercepts and analyzes the LLM calls.

**Key Components:**
- **Frontend**: Vanilla JavaScript SPA with OpenAI SDK integration (`js/app.js`)
- **Mock API**: Dev Proxy serves feedback data from `.devproxy/feedback-data.json`
- **LLM Integration**: GitHub Models API (models.github.ai) for GPT-4.1 categorization
- **Testing**: Playwright E2E tests that verify the full AI pipeline
- **Monitoring**: Dev Proxy tracks costs, latency, and usage patterns

## Critical Dev Proxy Integration

**Dev Proxy Configuration** (`.devproxy/devproxyrc.json`):
- `CrudApiPlugin`: Serves mock feedback API from `feedback-data.json`
- `OpenAITelemetryPlugin`: Tracks LLM costs and usage (EUR pricing in `azure-ai-prices.json`)
- `LatencyPlugin`: Simulates 200-500ms API delays
- `MarkdownReporter`: Generates usage reports

**Essential Commands:**
```bash
# Start dev server (port 8007)
npm start

# Run Playwright tests with Dev Proxy
npm test

# Install Edge browser for testing
npm run install:msedge
```

## LLM Integration Pattern

**Authentication**: Uses GitHub token via `js/env.js` (replaced by CI workflow)
**API Configuration**:
```javascript
const llmUrl = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";
```

**Retry Logic**: 3 attempts with category validation (`for-organizers`, `for-speakers`, `useless`)
**UI Pattern**: Pills are hidden by default, revealed via `.pills-visible` class after analysis

## Testing Strategy

**E2E Test Flow** (`tests/feedback-analysis.spec.js`):
1. Load app and wait for feedback items
2. Click "Analyze Feedback" button
3. Wait for "Analysis Complete" (120s timeout for LLM calls)
4. Verify all pills have valid categories (not all "Unknown")

**Key Test Configuration**:
- Uses Microsoft Edge browser only
- Network request/response logging enabled
- Slow test timeout for LLM processing
- Base URL: `http://127.0.0.1:8007`

## CI/CD Integration

**GitHub Actions Workflow** (`.github/workflows/test.yml`):
- Replaces `env.js` with actual `GITHUB_TOKEN`
- Sets up Dev Proxy with auto-recording
- Installs Chromium certificates for proxy
- Uploads Dev Proxy reports and logs as artifacts

**Key Workflow Features**:
- Uses `dev-proxy-tools/actions` for setup
- Enables job summary reporting
- Captures complete proxy logs for debugging

## Development Guidelines

**Environment Setup**: Always use Dev Proxy - the app expects intercepted APIs
**API Mocking**: Modify `.devproxy/feedback-data.json` to change test data
**Styling**: Uses CSS custom properties with dark mode support
**Error Handling**: LLM failures gracefully degrade to "unknown" category

**File Structure**:
- `js/app.js`: Core application logic
- `js/env.js`: API key configuration (replaced in CI)
- `.devproxy/`: Complete Dev Proxy configuration
- `tests/`: Playwright E2E tests
- `css/styles.css`: Modern CSS with pill styling
