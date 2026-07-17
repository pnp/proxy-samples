# Orders API

Base URL: `https://api.contoso.com/orders`

## List all orders

```http
GET https://api.contoso.com/orders
```

Returns an array of orders with OrderID, CustomerName, ProductID, Quantity, OrderDate, and Status fields.

## Get a specific order

```http
GET https://api.contoso.com/orders/{order-id}
```

Replace `{order-id}` with the numeric order ID.

## Update an order

Only include the fields you want to change.

```http
PATCH https://api.contoso.com/orders/{order-id}
Content-Type: application/json

{"Status": "Shipped"}
```

Common update scenarios:
- Update status: `{"Status": "Shipped"}` or `{"Status": "Cancelled"}`
- Change quantity: `{"Quantity": 15}`

## Delete an order

```http
DELETE https://api.contoso.com/orders/{order-id}
```
