# Generate and test JWTs with Dev Proxy

## Summary

This sample demonstrates how to use the `devproxy jwt create` command to generate JSON Web Tokens (JWTs) for testing API authentication scenarios. It includes a simulated CRUD API secured with JWT validation, allowing you to test different authentication scenarios locally without needing external identity providers.

![Dev Proxy generating and validating JWTs](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

* [GitHub Copilot](https://github.com/copilot)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 6, 2026|Initial release

## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/jwt-testing-toolkit) then unzip it)
* Start Dev Proxy with the sample configuration: `devproxy --config-file devproxyrc.json`
* In another terminal, generate a JWT with read scope and test the API:

  ```bash
  # Generate a JWT with read scope
  devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read"
  
  # Copy the generated token and use it to call the API
  # Replace <token> with the generated JWT
  curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers \
    -H "Authorization: Bearer <token>"
  ```

## JWT Generation Examples

### Basic JWT

Generate a simple JWT with default settings:

```bash
devproxy jwt create --name "Test User" --issuer "dev-proxy"
```

### JWT with Scopes

Generate a JWT with specific scopes for API access:

```bash
# Read-only access
devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read"

# Write access
devproxy jwt create --name "Alex Wilber" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Write"

# Multiple scopes
devproxy jwt create --name "Adele Vance" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" --scopes "Customers.Write"
```

### JWT with Roles

Generate a JWT with application roles:

```bash
# Admin role for delete operations
devproxy jwt create --name "Admin User" --issuer "dev-proxy" --audiences "https://api.contoso.com" --roles "Customers.Admin"

# Multiple roles
devproxy jwt create --name "Super Admin" --issuer "dev-proxy" --audiences "https://api.contoso.com" --roles "Customers.Admin" --roles "Users.Admin"
```

### JWT with Custom Claims

Add custom claims to simulate specific user contexts:

```bash
# Department claim
devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" --claims "department:engineering"

# Multiple custom claims
devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" --claims "department:engineering" --claims "level:senior" --claims "region:US"
```

### JWT with Custom Validity

Control how long the token is valid:

```bash
# Token valid for 2 hours (120 minutes)
devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" --valid-for 120

# Short-lived token (5 minutes) for security testing
devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" --valid-for 5
```

### JWT with Custom Signing Key

Use a specific signing key for consistent token generation:

```bash
devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" --signing-key "my-super-secret-signing-key-at-least-32-chars"
```

## Testing Scenarios

### Scenario 1: Successful Read Request

```bash
# Generate token with read scope
TOKEN=$(devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" | grep -o 'eyJ[^"]*')

# Get all customers
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers \
  -H "Authorization: Bearer $TOKEN"

# Get specific customer
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Scenario 2: Successful Write Request

```bash
# Generate token with write scope
TOKEN=$(devproxy jwt create --name "Alex Wilber" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Write" | grep -o 'eyJ[^"]*')

# Create new customer
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": 4, "name": "Adventure Works", "email": "hello@adventure.com", "department": "IT"}'

# Update customer
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -X PATCH \
  -d '{"department": "Engineering"}'
```

### Scenario 3: Admin Delete Operation

```bash
# Generate token with admin role
TOKEN=$(devproxy jwt create --name "Admin User" --issuer "dev-proxy" --audiences "https://api.contoso.com" --roles "Customers.Admin" | grep -o 'eyJ[^"]*')

# Delete customer
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers/3 \
  -H "Authorization: Bearer $TOKEN" \
  -X DELETE
```

### Scenario 4: Unauthorized Access (Missing Scope)

```bash
# Generate token with read scope only
TOKEN=$(devproxy jwt create --name "Megan Bowen" --issuer "dev-proxy" --audiences "https://api.contoso.com" --scopes "Customers.Read" | grep -o 'eyJ[^"]*')

# Try to create customer (should fail - requires write scope)
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": 5, "name": "Test", "email": "test@test.com"}'
```

### Scenario 5: No Authorization Header

```bash
# Call API without token (should fail)
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/v1/customers
```

## Features

This sample provides everything you need to test JWT-based authentication:

**JWT Generation Capabilities:**
* Generate JWTs with custom user names
* Add multiple scopes for fine-grained access control
* Include application roles for authorization
* Add custom claims for business logic testing
* Control token validity duration
* Use consistent signing keys across tests

**Simulated CRUD API with JWT Validation:**
* `GET /customers` - Requires `Customers.Read` scope
* `GET /customers/{id}` - Requires `Customers.Read` scope
* `POST /customers` - Requires `Customers.Write` scope
* `PATCH /customers/{id}` - Requires `Customers.Write` scope
* `DELETE /customers/{id}` - Requires `Customers.Admin` role

Using this sample you can use Dev Proxy to:

* Generate test JWTs locally without external identity providers
* Test API authentication and authorization scenarios
* Validate scope-based and role-based access control
* Simulate different user contexts with custom claims
* Debug authentication issues in your applications
* Create reproducible test scenarios with consistent tokens

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20jwt-testing-toolkit%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-jwt-testing-toolkit)
