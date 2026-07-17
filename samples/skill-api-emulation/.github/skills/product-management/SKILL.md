---
name: contoso-product-management
description: This skill should be used when the user asks to "manage products", "check inventory", "list orders", "update a product", "cancel an order", "check stock levels", or needs to perform operations against the Contoso product catalog and order management API.
---

# Contoso Product Management

Manage products and orders in the Contoso product catalog API at `https://api.contoso.com`.

## API resources

STOP — Before performing any operation, read the relevant resource file for endpoint details and request formats:

- **Products** (list, get, update, delete): Read `resources/products-api.md`
- **Orders** (list, get, update, delete): Read `resources/orders-api.md`

Load only the resource you need for the current task.

## Workflow

When the user asks to manage products or orders:

1. Read the relevant resource file from the `resources/` folder
2. List the relevant items to understand current state
3. Use the item IDs from the response to perform targeted operations
4. After updates or deletes, list items again to confirm the change
5. Report the result to the user

## Error handling

- **404**: The item with the specified ID does not exist
- **400**: The request body is malformed
- **405**: The HTTP method is not supported for this endpoint
