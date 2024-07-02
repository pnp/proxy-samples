# login
Write-Output "Sign in to Microsoft 365..."
npx -p @pnp/cli-microsoft365 -- m365 login --authType browser

# create AAD app
Write-Output "Creating Entra app..."
$appId = npx -p @pnp/cli-microsoft365 -- "m365 entra app add --name pnp-devproxy-improve-app-security-graph --multitenant --redirectUris http://localhost:3000 --apisDelegated https://graph.microsoft.com/Group.ReadWrite.All --grantAdminConsent --platform spa --query appId -o text"

Write-Output "AppId: $appId"

# write app to env.js
Write-Output "Writing app to env.js..."
"const appId = '$appId';" | Out-File .\src\env.js

Write-Output "DONE"
