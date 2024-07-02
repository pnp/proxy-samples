# Improve your app security when calling Microsoft Graph

## Summary

This sample demonstrates how to use Dev Proxy to improve your app security when calling Microsoft Graph API.

![Product support tickets web app showing a list of current support tickets and ticket type counts](./assets/web-app.png)

## Compatibility

![Dev Proxy v0.19](https://img.shields.io/badge/devproxy-v0.19-green.svg)

## Contributors

* [Garry Trinder](https://github.com/garrytrinder)

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 2, 2024|Initial release

## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/improve-app-security-graph) then unzip it)
* Run `npm install` to install project dependencies
* Run `scripts\setup.ps1` (Windows) or `scripts\setup.sh` (macOS) to create a Microsoft Entra app registration

## Features

Using this sample you can use the Dev Proxy to:

* Check for minimal permissions
* Check if you are using excessive permissions
* Prevent permission scope creep

### Check for minimal permissions

If you work on a large solution that uses many endpoints, it can be difficult to build the exact list of minimal permissions for your application.

To check for minimal permissions locally:

1. Start the local web server, `npm start`
1. Start Dev Proxy, `devproxy --config-file .\.dev-proxy\minimal-permissions.json --urls-to-watch "https://graph.microsoft.com/*" --record`
1. Navigate to `http://localhost:3000`, login and wait for the table to be populated
1. Stop recording mode, press <kbd>S</kdb>
1. Stop Dev Proxy, press <kbd>Ctrl</kbd> + <kbd>C</kbd>

The minimal scopes for the tracked requests is shown in the console output.

> [!NOTE]
> Authentication flow is real, however the responses from Microsoft Graph are mocked.

![Terminal output showing minimal scopes for the tracked requests](./assets/minimal-permissions.png)

### Check if you are using excessive permissions

A common approach to security is to apply the principle of least privilege (PoLP). This principle applies to users, processes and programs.

To check your access token for excessive permissions locally:

1. Start the local web server, `npm start`
1. Start Dev Proxy in recording mode, `devproxy -c .\.dev-proxy\minimal-permissions.json -u "https://graph.microsoft.com/*" --record`
1. Navigate to `http://localhost:3000`, login and wait for the table to be populated
1. Stop recording mode, press <kbd>S</kdb>
1. Stop Dev Proxy, press <kbd>Ctrl</kbd> + <kbd>C</kbd>

The guidance is shown in the console output.

> [!NOTE]
> Authentication flow is real, however the responses from Microsoft Graph are mocked.

![Terminal output showing minimal scopes for the tracked requests and excessive scopes](./assets/excessive-permissions.png)

### Prevent scope creep

This scenario uses Playwright end to end tests to automate the issuing of requests sent from your app to Microsoft Graph and generates a markdown report containing the minimal permission scopes and excessive scopes on the access token.

> [!IMPORTANT]
> For this scenario you will need to provide the username and password of an account which Playwright will use to login to your Microsoft 365 tenant and obtain an access token. MFA must not be enabled on this account.

> [!NOTE]
> This scenario uses the `devproxyrc.json` file in the root as it's configuration

To run the tests locally:

1. In the project root, rename `.env.sample` to `.env`
1. In the `.env` file, replace `TEST_USERNAME` and `TEST_PASSWORD` values with those of your test account
1. Start Dev Proxy, `devproxy --record`
1. Run tests, `npm test`
1. Stop Dev Proxy, press <kbd>Ctrl</kbd> + <kbd>C</kbd>
1. Open `MinimalPermissionsGuidancePlugin_MarkdownReporter.md` file to view the output

> [!NOTE]
> Authentication flow is real, however the responses from Microsoft Graph are mocked.

![Visual Studio Code showing passed Playwright tests in the Test Explorer, a Playwright test written in TypeScript, a terminal window with Dev Proxy running and the generated markdown report open in the editor displaying minimal permissions and excessive permissions](./assets/playwright.png)

A [GitHub Workflow](./.github/workflows/api-permissions-check.yml) and [Azure DevOps Pipeline](./azure-pipelines.yml) are provided to automatically run Playwright and Dev Proxy when new code is committed to the repo.

### Github Actions

To use the workflow, you will need to:

* Create `TEST_PASSWORD` secret, set the value to the password of your test account. See [Creating secrets for a repository](https://docs.github.com/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)
* Create `TEST_USERNAME` variable, set the value to the username of your test account. See [Creating configuration variables for a repository](https://docs.github.com/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository)
* Create `APPID` variable, set the value to the ID of the Microsoft Entra app registration which is stored in the `env.js` file in the `src` directory.

![GitHub Actions workflow job summary displaying the markdown report](./assets/github-actions.png)

### Azure Pipelines

To use the workflow, you will need to:

* Create `TEST_PASSWORD` variable, set the value to the password of your test account. See [Secret variable in the UI](https://learn.microsoft.com/azure/devops/pipelines/process/set-secret-variables?view=azure-devops&tabs=yaml%2Cbash#secret-variable-in-the-ui)
* Create `TEST_USERNAME` variable, set the value to the username of your test account.
* Create `APPID` variable, set the value to the ID of the Microsoft Entra app registration which is stored in the `env.js` file in the `src` directory.

![Azure Pipelines job summary](./assets/azure-pipelines.png)

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20YOUR-SOLUTION-NAME%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-improve-app-security-graph)
