# My store API

- root endpoint

  /api/v1

- endpoints:

  users
  customers
  suppliers
  categories
  products
  orders

- schemas:

  - users:
      email
      password
      role(optional)
  - customers:
      name
      lastName
      phone
  - user:
      email
      password
  - suppliers:
      name
      company
      email
      phone
  - categories:
      name
      description
      image
  - products:
      name
      price
      description
      image
  - orders:
      customerId
      delivered (boolean)
