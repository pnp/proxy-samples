#!/usr/bin/env bash

# login
echo "Sign in to Microsoft 365..."
npx -p @pnp/cli-microsoft365 -- m365 login --authType browser

# create AAD app
echo "Creating Entra app..."
appId=$(npx -p @pnp/cli-microsoft365 -- m365 entra app add --name pnp-devproxy-improve-app-security-graph --multitenant --redirectUris http://localhost:3000 --apisDelegated https://graph.microsoft.com/Group.ReadWrite.All --grantAdminConsent --platform spa --query appId -o text)

# write app to env.js
echo "Writing app to env.js..."
echo "const appId = '$appId';" > ./src/env.js

# write scopes to env.js
Write-Output "Writing scopes to env.js..."
echo "const scopes = ['Group.ReadWrite.All'];" >> ./src/env.js

echo "DONE"
