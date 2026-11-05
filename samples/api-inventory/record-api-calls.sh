#!/usr/bin/env bash
# Records the API calls that your app makes, using Dev Proxy and its API.
#
# Usage: ./record-api-calls.sh "<urls-to-watch>" <command to run your app>
# Example: ./record-api-calls.sh "https://api.contoso.com/*" npm start
#
# Run it from the folder where you want Dev Proxy to save the reports.
# Requires: devproxy, curl, jq

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 \"<urls-to-watch>\" <command to run your app>" >&2
  exit 2
fi

URLS_TO_WATCH="$1"
shift

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${DEVPROXY_CONFIG_FILE:-$SCRIPT_DIR/.devproxy/devproxyrc.json}"

# Start Dev Proxy in the background. With --output json, Dev Proxy prints
# the PID, proxy URL, and API URL of the started instance.
DEVPROXY_INFO=$(devproxy --config-file "$CONFIG_FILE" \
  --urls-to-watch "$URLS_TO_WATCH" \
  --detach --output json)
PID=$(echo "$DEVPROXY_INFO" | jq -r '.data.pid')
PROXY_URL=$(echo "$DEVPROXY_INFO" | jq -r '.data.proxyUrl')
API_URL=$(echo "$DEVPROXY_INFO" | jq -r '.data.apiUrl')

# Every call to the Dev Proxy API requires a token
TOKEN=$(devproxy api token --pid "$PID")
AUTH_HEADER="Authorization: Bearer $TOKEN"

stop_devproxy() {
  curl -sf -X POST -H "$AUTH_HEADER" "$API_URL/proxy/stopProxy" > /dev/null || true
}
trap stop_devproxy EXIT

# Get Dev Proxy's root certificate so that your app trusts it
CA_FILE="$(pwd)/devproxy-ca.pem"
curl -sf -H "$AUTH_HEADER" "$API_URL/proxy/rootCertificate?format=crt" -o "$CA_FILE"

# Start recording
curl -sf -X POST -H "$AUTH_HEADER" -H "Content-Type: application/json" \
  -d '{"recording":true}' "$API_URL/proxy" > /dev/null

# Run the app through Dev Proxy. NODE_USE_ENV_PROXY requires Node.js 24 or
# later. For other runtimes, configure the proxy and trust $CA_FILE as needed.
APP_EXIT_CODE=0
HTTP_PROXY="$PROXY_URL" HTTPS_PROXY="$PROXY_URL" \
  NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS="$CA_FILE" \
  "$@" || APP_EXIT_CODE=$?

# Stop recording. Dev Proxy writes the reports before it responds.
curl -sf -X POST -H "$AUTH_HEADER" -H "Content-Type: application/json" \
  -d '{"recording":false}' "$API_URL/proxy" > /dev/null

exit "$APP_EXIT_CODE"
