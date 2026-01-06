# CRUD API secured with Microsoft Entra

## Summary

This sample demonstrates how to simulate a CRUD API secured with Microsoft Entra authentication using Dev Proxy. It showcases three different authentication configurations:

1. **Single scope** - All API operations use the same permission scope
2. **Different scopes** - Read and write operations require different permission scopes
3. **Token validation** - Full token signature and lifetime validation

Use this sample to build frontend applications before the backend API exists, with real Microsoft Entra authentication flow.

![Dev Proxy simulating a Microsoft Entra secured CRUD API](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [Copilot](https://github.com/copilot)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 6, 2026|Initial release

## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/entra-secured-crud-api) then unzip it)
- Navigate to the `samples/entra-secured-crud-api` folder
- Start Dev Proxy with the default configuration (single scope):
  ```bash
  devproxy --config-file devproxyrc.json
  ```
- Test the API with curl (requires a valid token):
  ```bash
  curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers -H "Authorization: Bearer <your-token>"
  ```

### Using different configurations

To use the different scopes configuration (read vs write):

1. Update `devproxyrc.json` to reference `customers-api-different-scopes.json`:
   ```json
   "customersApi": {
     "apiFile": "customers-api-different-scopes.json"
   }
   ```

To use the validated token configuration:

1. Update `devproxyrc.json` to reference `customers-api-validated.json`:
   ```json
   "customersApi": {
     "apiFile": "customers-api-validated.json"
   }
   ```

## Features

This sample includes three API configuration files demonstrating different authentication scenarios.

### 1. Single Scope Configuration (`customers-api-single-scope.json`)

All API operations are secured with a single scope: `api://contoso.com/user_impersonation`.

Endpoints:

Endpoint|Method|Description
--------|------|-------
`/v1/customers`|`GET`|Get all customers
`/v1/customers/{customer-id}`|`GET`|Get a customer by ID
`/v1/customers`|`POST`|Create a new customer
`/v1/customers/{customer-id}`|`PATCH`|Update a customer
`/v1/customers/{customer-id}`|`PUT`|Replace a customer
`/v1/customers/{customer-id}`|`DELETE`|Delete a customer

### 2. Different Scopes Configuration (`customers-api-different-scopes.json`)

Read and write operations require different permission scopes:

- **Read operations** (GET): `api://contoso.com/customer.read`
- **Write operations** (POST, PATCH, PUT, DELETE): `api://contoso.com/customer.write`

### 3. Validated Token Configuration (`customers-api-validated.json`)

Full token validation with:

- `validateSigningKey: true` - Validates the token is authentically signed by Microsoft Entra
- `validateLifetime: true` - Validates the token hasn't expired

Use this configuration when you have a real Microsoft Entra app registration and want to test with actual tokens.

## Authentication Configuration

The sample uses the following Microsoft Entra configuration:

Property|Value
--------|-----
Audience|`https://api.contoso.com`
Issuer|`https://login.microsoftonline.com/contoso.com`

> [!NOTE]
> Update these values to match your actual Microsoft Entra configuration when testing with real tokens.

## Example API Calls

### Get all customers

```bash
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers \
  -H "Authorization: Bearer <your-token>"
```

### Get a specific customer

```bash
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers/1 \
  -H "Authorization: Bearer <your-token>"
```

### Create a new customer

```bash
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"id": 6, "name": "New Customer", "email": "new@customer.com"}'
```

### Update a customer

```bash
curl -ikx http://127.0.0.1:8000 -X PATCH https://api.contoso.com/v1/customers/1 \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1-555-9999"}'
```

### Delete a customer

```bash
curl -ikx http://127.0.0.1:8000 -X DELETE https://api.contoso.com/v1/customers/1 \
  -H "Authorization: Bearer <your-token>"
```

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20entra-secured-crud-api%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-entra-secured-crud-api)
