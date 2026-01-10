# Force HTTPS during development

## Summary

This sample demonstrates how to use Dev Proxy to automatically rewrite HTTP requests to HTTPS during development. This helps match production security locally and test against HTTPS without certificate hassles.

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

* [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 10, 2026|Initial release

## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/http-to-https-redirect) then unzip it)
* Start Dev Proxy specifying the path to the config file: `devproxy --config-file devproxyrc.json`
* Test the rewrite by making HTTP requests that will be automatically redirected to HTTPS:
  ```bash
  # This HTTP request will be rewritten to HTTPS
  curl -ikx http://127.0.0.1:8000 http://jsonplaceholder.typicode.com/posts/1
  
  # Dev Proxy will intercept the request and change it to:
  # https://jsonplaceholder.typicode.com/posts/1
  ```

## Features

This sample provides a Dev Proxy configuration that rewrites HTTP requests to HTTPS:

**Rewrite Rules:**
* HTTP to HTTPS - Rewrites all `http://` URLs to `https://`

**Key Benefits:**
* **Match production security locally** - Ensure your development environment uses HTTPS just like production
* **Test against HTTPS without certificate hassles** - Dev Proxy handles the protocol rewriting transparently
* **Easy to customize** - Add more rewrite rules in `rewrites.json` for additional URL transformations

**Additional Rewrite Patterns:**
You can extend the `rewrites.json` file with additional patterns such as:
* Change API versions (v1 to v2)
* Redirect staging to production URLs
* Add/modify query parameters

Using this sample you can use the Dev Proxy to:

* Automatically force HTTPS for all HTTP requests during development
* Test HTTPS behavior without modifying your application code
* Ensure consistency between development and production environments

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20http-to-https-redirect%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-http-to-https-redirect)
