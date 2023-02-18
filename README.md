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
  profile/my-orders

- HTTPRequets

  - get
  - get:id
  - post
  - put:id
  - delete:id
  - post,put and delete paths require to be authenticated and authorized as admin or superAdmin role,
  - get orders and get:id orders require to be authenticated and authorized as admin, superAdmin role
  - post,put:id,delete:id orders require to be authenticated and authorized as admin, superAdmin o customer role
  - profile/my-orders require to be authenticated

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

## how to create or modify info

- users: post
  "email":"gilbertferney@hotmail.com",
  "password":"123456",
  "role":"admin"
- users: patch
  "email": "minuevoemail@algo.algo"
- customer: post
  "name": "luis",
  "lastName": "molina",
  "phone": "3225555588",
  "user":{
  "email":"luchitomolina@gmail.com",
  "password":"123456"
  }
- customer: patch
  "phone": "3165532895"
- supplier: post
  "name":"luis",
  "company":"myCompany",
  "phone":"3225555555",
  "email":"miemail@gmail.com"
- supplier: patch
  "company": "nueva compañia"
- categories: post
  "name":"Other category3",
  "description":"this is abouth something",
  "image":"http://something.jpg"
- categories: patch
  "description":"this category is abouth electronics"
- products: post
  "name":"an electronic device",
  "description":"this is any electronic device",
  "image":"http://device.jpg",
  "price":"35",
  "categoryId":"1",
  "supplierId":"1"
- products: patch
  "price":"35"
- orders: post
  "customerId":6
- orders:patch
  "delivered":true
- orders/add-item: post
  "orderId":3,
  "productId":1,
  "amount":2
