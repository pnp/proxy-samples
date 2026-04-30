# Webhook delivery resilience testing

Test how your webhook receiver handles duplicate events, out-of-order deliveries, invalid signatures, replay attempts, and transient failures by using Dev Proxy.

![Dev Proxy simulating webhook delivery resilience scenarios](assets/snap-1.png)

## Summary

This sample provides realistic webhook delivery scenarios that frequently break production integrations. You can use it to validate idempotency handling, event sequencing checks, signature verification, and retry behavior.

In simple terms: this sample helps you test what your app does when the same notification arrives twice, arrives in the wrong order, has a bad security signature, or the receiving system is temporarily unavailable.

## Typical use case

Imagine you run an online store and your payment provider sends webhook events such as payment.created and payment.succeeded. In real life:

- The same event can be delivered more than once
- Events can arrive out of order
- Some requests can fail security checks
- Your server can be temporarily overloaded

This sample lets you test those situations locally before they happen in production.

## Compatibility

![Dev Proxy v2.3.0](https://aka.ms/devproxy/badge/v2.3.0)

## Contributors

- [Lovy Jain](https://github.com/lovyjain)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 30, 2026|Initial release

## Minimal path to awesome

- Get the sample:
  - Download just this sample:

      ```bash
      npx gitload-cli https://github.com/pnp/proxy-samples/tree/main/samples/webhook-delivery-resilience
      ```

    or

  - [Download as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/webhook-delivery-resilience) and unzip it, or
  - Clone this repository
- Start Dev Proxy:

  ```bash
  devproxy
  ```

- Exercise each scenario using curl through Dev Proxy:

  ```bash
  # Happy path
  curl -ikx http://127.0.0.1:8000 -X POST https://webhooks.contoso.com/deliveries/success

  # Duplicate event ID
  curl -ikx http://127.0.0.1:8000 -X POST https://webhooks.contoso.com/deliveries/duplicate

  # Out-of-order event sequence
  curl -ikx http://127.0.0.1:8000 -X POST https://webhooks.contoso.com/deliveries/out-of-order

  # Invalid signature
  curl -ikx http://127.0.0.1:8000 -X POST https://webhooks.contoso.com/deliveries/invalid-signature

  # Replay detection
  curl -ikx http://127.0.0.1:8000 -X POST https://webhooks.contoso.com/deliveries/replayed

  # Transient failure / eventual success path
  curl -ikx http://127.0.0.1:8000 -X POST https://webhooks.contoso.com/deliveries/transient

  # Run transient several times to see both outcomes (503 and 202)
  for /L %i in (1,1,10) do curl -ikx http://127.0.0.1:8000 -X POST https://webhooks.contoso.com/deliveries/transient
  ```

## Features

This sample includes deterministic and transient webhook behaviors:

- Duplicate event rejection (`409 duplicate_event`)
- Out-of-order event rejection (`409 out_of_order`)
- Signature validation failure (`401 invalid_signature`)
- Replay attack detection (`409 replay_detected`)
- Transient receiver overload with dynamic `Retry-After` (`503 delivery_backpressure`)
- Eventual success for transient delivery attempts (`202 queued`)

Note: the transient route uses a 50% error rate, so repeated calls intentionally alternate between temporary failure and success.

![Transient scenario showing mix of 503 and 202 responses](assets/snap-2.png)

Using this sample you can:

- Verify idempotency implementation for webhook event IDs
- Test sequence validation logic for related event types
- Validate signature verification and replay-window checks
- Exercise retry logic that respects `Retry-After` headers

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20webhook-delivery-resilience%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-webhook-delivery-resilience)
