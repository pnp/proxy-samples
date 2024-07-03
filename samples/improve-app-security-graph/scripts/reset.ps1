# login
Write-Output "Sign in to Microsoft 365..."
npx -p @pnp/cli-microsoft365@7.10.0 -- m365 login --authType browser

# read the contents of env/src.js
$envJs = Get-Content .\src\env.js

# extract the appId from the first line of the file
$appId = $envJs[0] -replace 'const appId = ''(.*)'';', '$1'

# replace scopes in env.js
Write-Output "Replacing scopes in env.js..."
$envJs -replace 'const scopes = \[.*\];', 'const scopes = ["https://graph.microsoft.com/Group.ReadWrite.All"];' | Out-File .\src\env.js

# get service principal id
Write-Output "Getting service principal id..."
$spId = npx -p @pnp/cli-microsoft365@7.10.0 --  "m365 entra sp get --appId ${appId} --query id -o text"

# remove the service principal
Write-Output "Removing the service principal..."
npx -p @pnp/cli-microsoft365@7.10.0 -- "m365 request --resource https://graph.microsoft.com --method delete --url https://graph.microsoft.com/v1.0/servicePrincipals/${spId}"

# create a new service principal
Write-Output "Creating a new service principal..."
npx -p @pnp/cli-microsoft365@7.10.0 -- "m365 entra sp add --appId ${appId}"

# add the Group.ReadWrite.All permission
Write-Output "Adding Group.ReadWrite.All permission..."
npx -p @pnp/cli-microsoft365@7.10.0 -- "m365 entra app permission add --appId ${appId} --delegatedPermissions https://graph.microsoft.com/Group.ReadWrite.All --grantAdminConsent"

# remove the Tasks.Read permission
Write-Output "Removing the Tasks.Read permission..."
npx -p @pnp/cli-microsoft365@7.10.0 -- "m365 entra app permission remove --appId ${appId} --delegatedPermissions https://graph.microsoft.com/Tasks.Read --force"

Write-Output "DONE"