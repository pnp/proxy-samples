#!/bin/bash

# This script onboards the Contoso Products API to Azure API Center
# Usage: ./setup.sh <subscription-id> <resource-group> <api-center-name>

set -e

SUBSCRIPTION_ID=${1:-"your-subscription-id"}
RESOURCE_GROUP=${2:-"your-resource-group"}
API_CENTER_NAME=${3:-"your-api-center"}

echo "Onboarding Contoso Products API to Azure API Center..."
echo "Subscription: $SUBSCRIPTION_ID"
echo "Resource Group: $RESOURCE_GROUP"
echo "API Center: $API_CENTER_NAME"

# Set the subscription
az account set --subscription "$SUBSCRIPTION_ID"

# Register the API in API Center
az apic api create \
  --resource-group "$RESOURCE_GROUP" \
  --service-name "$API_CENTER_NAME" \
  --api-id "contoso-products-api" \
  --title "Contoso Products API" \
  --type "rest"

# Create an API version
az apic api version create \
  --resource-group "$RESOURCE_GROUP" \
  --service-name "$API_CENTER_NAME" \
  --api-id "contoso-products-api" \
  --version-id "v1-0-0" \
  --title "v1.0.0" \
  --lifecycle-stage "production"

# Create an API definition and import the OpenAPI spec
az apic api definition create \
  --resource-group "$RESOURCE_GROUP" \
  --service-name "$API_CENTER_NAME" \
  --api-id "contoso-products-api" \
  --version-id "v1-0-0" \
  --definition-id "openapi" \
  --title "OpenAPI"

# Import the OpenAPI spec
az apic api definition import-specification \
  --resource-group "$RESOURCE_GROUP" \
  --service-name "$API_CENTER_NAME" \
  --api-id "contoso-products-api" \
  --version-id "v1-0-0" \
  --definition-id "openapi" \
  --format "inline" \
  --specification '{"name":"openapi","version":"3.0.1"}' \
  --value "$(cat api.contoso.com.json)"

echo ""
echo "API onboarded successfully!"
echo ""
echo "Next steps:"
echo "1. Update devproxyrc.json with your API Center information"
echo "2. Run 'az login' to authenticate"
echo "3. Run 'devproxy' to start detecting shadow APIs"
