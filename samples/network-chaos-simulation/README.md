# Simulate slow and failing network conditions

## Summary

This sample contains a preset to simulate slow and failing network conditions for resilience testing. It combines the LatencyPlugin to add realistic network delays with the GenericRandomErrorPlugin to randomly return server errors, helping you test how your applications handle challenging network environments.

Using this preset, you can verify that your app properly handles:
- Slow API responses (200ms to 10 seconds of latency)
- Random server errors (500, 503, 504)
- Retry logic and back-off strategies
- Loading states and timeout handling

![Dev Proxy simulating network chaos](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

* [Copilot](https://github.com/copilot)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 6, 2026|Initial release

## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/network-chaos-simulation) then unzip it)
* Start Dev Proxy specifying the path to the config file: `devproxy --config-file devproxyrc.json`
* Test the simulation by making requests to the watched URLs:

```bash
# Test with JSONPlaceholder API (included in urlsToWatch)
curl -ikx http://127.0.0.1:8000 https://jsonplaceholder.typicode.com/posts/1

# Test multiple requests to see varying latency and errors
curl -ikx http://127.0.0.1:8000 https://jsonplaceholder.typicode.com/users
curl -ikx http://127.0.0.1:8000 https://jsonplaceholder.typicode.com/todos/1

# Add your own API URLs to urlsToWatch in devproxyrc.json
```

## Features

This preset combines two plugins to simulate realistic network chaos:

**LatencyPlugin** - Adds artificial delays to responses:
- Minimum delay: 200ms (simulating typical network latency)
- Maximum delay: 10,000ms (simulating very slow connections or timeouts)
- Random delay applied to each request within this range

**GenericRandomErrorPlugin** - Returns random server errors:
- 30% of requests fail with a random error
- 500 Internal Server Error - unexpected server failures
- 503 Service Unavailable - temporary service outages with Retry-After header
- 504 Gateway Timeout - upstream server timeouts

**RetryAfterPlugin** - Validates retry behavior:
- Ensures clients respect the Retry-After header
- Helps test back-off strategies

Using this sample you can use Dev Proxy to:

* Test your app's loading spinners and progress indicators
* Verify timeout handling and user feedback
* Test retry logic with exponential back-off
* Validate error messages shown to users
* Ensure graceful degradation under poor network conditions
* Build apps that work reliably on slow connections

## Customization

You can adjust the simulation parameters in `devproxyrc.json`:

```json
"latencyPlugin": {
  "minMs": 200,    // Minimum latency in milliseconds
  "maxMs": 10000   // Maximum latency in milliseconds
}
```

```json
"networkErrors": {
  "errorsFile": "network-errors.json",
  "rate": 30    // Percentage of requests that fail (0-100)
}
```

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20network-chaos-simulation%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-network-chaos-simulation)
