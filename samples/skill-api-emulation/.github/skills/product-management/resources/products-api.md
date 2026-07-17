# Products API

Base URL: `https://api.contoso.com/products`

## List all products

```http
GET https://api.contoso.com/products
```

Returns an array of products with ProductID, ProductName, Category, UnitPrice, UnitsInStock, and Discontinued fields.

## Get a specific product

```http
GET https://api.contoso.com/products/{product-id}
```

Replace `{product-id}` with the numeric product ID.

## Update a product

Only include the fields you want to change.

```http
PATCH https://api.contoso.com/products/{product-id}
Content-Type: application/json

{"UnitPrice": 34.99}
```

Common update scenarios:
- Change the price: `{"UnitPrice": 34.99}`
- Update stock: `{"UnitsInStock": 200}`
- Discontinue a product: `{"Discontinued": true}`
- Rename a product: `{"ProductName": "New Name"}`

## Delete a product

```http
DELETE https://api.contoso.com/products/{product-id}
```
