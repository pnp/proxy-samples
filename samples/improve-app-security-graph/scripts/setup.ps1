# login
Write-Output "Sign in to Microsoft 365..."
npx -p @pnp/cli-microsoft365@7.10.0 -- m365 login --authType browser

# create AAD app
Write-Output "Creating Entra app..."
$appId = npx -p @pnp/cli-microsoft365@7.10.0 -- "m365 entra app add --name pnp-devproxy-improve-app-security-graph --multitenant --redirectUris http://localhost:3000 --apisDelegated https://graph.microsoft.com/Group.ReadWrite.All --grantAdminConsent --platform spa --query appId -o text"

# write app to env.js
Write-Output "Writing appId to env.js..."
"const appId = '$appId';" | Out-File .\src\env.js

# write scopes to env.js
Write-Output "Writing scopes to env.js..."
"const scopes = ['https://graph.microsoft.com/Group.ReadWrite.All'];" | Out-File .\src\env.js -Append

Write-Output "DONE"
