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
  auth/login

- HTTPRequets
  - get
  - get:id
  - post
  - put:id
  - delete:id
  - post,put and delete paths require to be authenticated and authorized as admin or superAdmin role

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
