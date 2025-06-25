# CRUD APIs with Northwind database data

## Summary

This sample contains a set of CRUD APIs based on the [Northwind database data](https://github.com/microsoft/sql-server-samples/blob/68db9029ba9e893365a7022c1d2262f5b5cf6ca2/samples/databases/northwind-pubs/readme.md). Use this API to get mock data in your app.

![Dev Proxy simulating a customers API endpoint using the Northwind data](assets/customers.png)

## Compatibility

![Dev Proxy v0.29.2](https://aka.ms/devproxy/badge/v0.29.2)

## Contributors

- [Waldek Mastykarz](https://github.com/waldekmastykarz)

## Version history

Version|Date|Comments
-------|----|--------
1.2|June 27, 2025|Updated to Dev Proxy v0.29.2
1.1|January 25, 2024|Updated schema version
1.0|January 16, 2024|Initial release

## Minimal path to awesome

- Get the preset using Dev Proxy by running `devproxy preset get northwinddb`
- Start Dev Proxy with the config file, by running `devproxy --config-file "~appFolder/presets/northwinddb/northwind.json"`

## Features

CRUD APIs from this preset are exposed at `https://api.northwind.com`.

This preset contains the following endpoints and operations.

### Product categories

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/categories`|`GET`|Get all product categories|`GET https://api.northwind.com/categories`
`/categories/{category-id}`|`GET`|Get a product category|`GET https://api.northwind.com/categories/1`
`/categories`|`POST`|Create a product category|`POST https://api.northwind.com/categories {"CategoryID": 9, "CategoryName": "New category", "Description", "New category description", "Picture": "abc"}`
`/categories/{category-id}`|`PATCH`|Update a product category|`PATCH https://api.northwind.com/categories/1 {"CategoryName": "New category name"}`
`/categories/{category-id}`|`DELETE`|Delete a product category|`DELETE https://api.northwind.com/categories/1`

### Customers

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/customers`|`GET`|Get all customers|`GET https://api.northwind.com/customers`
`/customers/{customer-id}`|`GET`|Get a customer|`GET https://api.northwind.com/customers/ALFKI`
`/customers`|`POST`|Create a customer|`POST https://api.northwind.com/customers { "CustomerID": "ABCD1", "CompanyName": "Fictitious Corp", "ContactName": "John Doe", "ContactTitle": "CEO", "Address": "1234 Fictional St", "City": "Imaginary City", "PostalCode": "12345", "Country": "Neverland", "Phone": "(123) 456-7890", "Fax": "(123) 456-7890" }`
`/customers/{customer-id}`|`PATCH`|Update a customer|`PATCH https://api.northwind.com/customers/ALFKI {"CompanyName": "New company name"}`
`/customers/{customer-id}`|`DELETE`|Delete a customer|`DELETE https://api.northwind.com/customers/ALFKI`

### Employees

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/employees`|`GET`|Get all employees|`GET https://api.northwind.com/employees`
`/employees/{employee-id}`|`GET`|Get an employee|`GET https://api.northwind.com/employees/1`
`/employees`|`POST`|Create an employee|`POST https://api.northwind.com/employees { "EmployeeID": 10, "LastName": "Johnson", "FirstName": "Michael", "Title": "Account Manager", "TitleOfCourtesy": "Mr.", "BirthDate": "1975-04-18T00:00:00", "HireDate": "2000-08-14T00:00:00", "Address": "233 S Wacker Dr, Suite 800", "City": "Chicago", "Region": "IL", "PostalCode": "60606", "Country": "USA", "HomePhone": "(312) 555-1234", "Extension": "7890", "Photo": "KJ89D", "Notes": "Holds an MBA from Harvard Business School, graduated in 1999. Has worked in various sales and marketing roles. Enjoys golf and running marathons.", "ReportsTo": 1, "PhotoPath": "http://accweb/emmployees/johnson.jpg" }`
`/employees/{employee-id}`|`PATCH`|Update an employee|`PATCH https://api.northwind.com/employees/1 {"Title": "Sales manager"}`
`/employees/{employee-id}`|`DELETE`|Delete an employee|`DELETE https://api.northwind.com/employees/1`
`/employees/{employee-id}/territories`|`GET`|Get all territories for the specified employee|`GET https://api.northwind.com/employees/1/territories`
`/employees/{employee-id}/territories`|`POST`|Associate an employee with a territory|`POST https://api.northwind.com/employees/1/territories { "EmployeeID": 1, "TerritoryID": "01833" }`
`/employees/{employee-id}/territories/{territory-id}`|`DELETE`|Remove an employee from the territory|`DELETE https://api.northwind.com/employees/1/territories/01833`

### Orders

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/orders`|`GET`|Get all orders|`GET https://api.northwind.com/orders`
`/orders/{order-id}`|`GET`|Get an order|`GET https://api.northwind.com/orders/10248`
`/orders`|`POST`|Create an order|`POST https://api.northwind.com/orders {"OrderID":11078,"CustomerID":"VINET","EmployeeID":5,"OrderDate":"1996-07-04T00:00:00","RequiredDate":"1996-08-01T00:00:00","ShippedDate":"1996-07-16T00:00:00","ShipVia":3,"Freight":32.38,"ShipName":"Vins et alcools Chevalier","ShipAddress":"59 rue de l'Abbaye","ShipCity":"Reims","ShipPostalCode":"51100","ShipCountry":"France"}`
`/orders/{order-id}`|`PATCH`|Update an order|`PATCH https://api.northwind.com/orders/10248 {"Freight": 72.51}`
`/orders/{order-id}`|`DELETE`|Delete an order|`DELETE https://api.northwind.com/orders/10248`
`/orders/{order-id}/details`|`GET`|Get products from the specified orders|`GET https://api.northwind.com/orders/10248/details`
`/orders/{order-id}/details`|`POST`|Add a product to an order|`POST https://api.northwind.com/orders/10248/details {"OrderID":10248,"ProductID":14,"UnitPrice":14,"Quantity":12,"Discount":0}`
`/orders/{order-id}/details/{product-id}`|`PATCH`|Update product information for an order|`PATCH https://api.northwind.com/orders/10248/details/11 {"Quantity": 11}`
`/orders/{order-id}/details/{product-id}`|`DELETE`|Remove a product from an order|`DELETE https://api.northwind.com/orders/10248/details/11`

### Products

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/products`|`GET`|Get all products|`GET https://api.northwind.com/products`
`/products/{product-id}`|`GET`|Get a product|`GET https://api.northwind.com/products/1`
`/products`|`POST`|Create a product|`POST https://api.northwind.com/products {"ProductID": 2, "ProductName": "Green Tea", "SupplierID": 2, "CategoryID": 2, "QuantityPerUnit": "20 boxes x 30 bags", "UnitPrice": 15, "UnitsInStock": 24, "UnitsOnOrder": 5, "ReorderLevel": 5, "Discontinued": false}`
`/products/{product-id}`|`PATCH`|Update a product|`PATCH https://api.northwind.com/products/1 {"ProductName": "Chai tea"}`
`/products/{product-id}`|`DELETE`|Delete a product|`DELETE https://api.northwind.com/products/1`

### Regions

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/regions`|`GET`|Get all regions|`GET https://api.northwind.com/regions`
`/regions/{region-id}`|`GET`|Get a region|`GET https://api.northwind.com/regions/1`
`/regions`|`POST`|Create a region|`POST https://api.northwind.com/regions {"RegionID": 5, "RegionDescription": "New region"}`
`/regions/{region-id}`|`PATCH`|Update a region|`PATCH https://api.northwind.com/regions/4 {"RegionDescription": "Southern most"}`
`/regions/{region-id}`|`DELETE`|Delete a region|`DELETE https://api.northwind.com/regions/1`

### Shippers

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/shippers`|`GET`|Get all shippers|`GET https://api.northwind.com/shippers`
`/shippers/{shipper-id}`|`GET`|Get a shipper|`GET https://api.northwind.com/shippers/1`
`/shippers`|`POST`|Create a shipper|`POST https://api.northwind.com/shippers {"ShipperID": 4, "CompanyName": "Rapid Delivery", "Phone": "(202) 555-0198"}`
`/shippers/{shipper-id}`|`PATCH`|Update a shipper|`PATCH https://api.northwind.com/shippers/1 {"Phone": "(503) 555-9832"}`
`/shippers/{shipper-id}`|`DELETE`|Delete a shipper|`DELETE https://api.northwind.com/shippers/1`

### Suppliers

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/suppliers`|`GET`|Get all suppliers|`GET https://api.northwind.com/suppliers`
`/suppliers/{supplier-id}`|`GET`|Get a supplier|`GET https://api.northwind.com/suppliers/1`
`/suppliers`|`POST`|Create a supplier|`POST https://api.northwind.com/suppliers {"SupplierID": 30, "CompanyName": "Montagnes du Sirop d'Érable", "ContactName": "Lucie Tremblay", "ContactTitle": "Sales Manager", "Address": "202 rue Des Pionniers", "City": "Sherbrooke", "Region": "Québec", "PostalCode": "J1H 5H3", "Country": "Canada", "Phone": "(819) 555-3210", "Fax": "(819) 555-6543"}`
`/suppliers/{supplier-id}`|`PATCH`|Update a supplier|`PATCH https://api.northwind.com/suppliers/1 {"Phone": "(171) 555-2223"}`
`/suppliers/{supplier-id}`|`DELETE`|Delete a supplier|`DELETE https://api.northwind.com/suppliers/1`

### Territories

Endpoint|Method|Description|Example
--------|------|-----------|-------
`/territories`|`GET`|Get all territories|`GET https://api.northwind.com/territories`
`/territories/{territory-id}`|`GET`|Get a territory|`GET https://api.northwind.com/territories/1`
`/territories`|`POST`|Create a territory|`POST https://api.northwind.com/territories {"TerritoryID": "90210", "TerritoryDescription": "Beverly Hills", "RegionID": 2}`
`/territories/{territory-id}`|`PATCH`|Update a territory|`PATCH https://api.northwind.com/territories/01581 {"TerritoryDescription": "Westborough"}`
`/territories/{territory-id}`|`DELETE`|Delete a territory|`DELETE https://api.northwind.com/territories/01581`

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20spfx%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-northwinddb)
