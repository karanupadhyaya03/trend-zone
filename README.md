# Trend Zone - E-commerce Web Application

Trend Zone is an e-commerce web application developed using the MERN stack (MongoDB, ExpressJS, React, and Node.JS) with TypeScript. The app focuses on providing college students a platform to buy goodies such as T-shirts and other merchandise, while also enabling college clubs, hostels, and departments to act as sellers.

## Live Deployment (Demo)

The app is live and accessible at [https://trendzone-p863.onrender.com](https://trendzone-p863.onrender.com)

## Features

- User Registration: College students can sign up using their email IDs to access the app's features.
- Homepage: The homepage displays all available merchandise for users to browse and purchase.
- Cart Page: Users can view their selected items in the cart before proceeding to checkout.
- Checkout: Users can enter their shipping address and review the order summary before placing an order.
- Payment: Dummy payment processing is integrated using `@paypal/react-paypal-js`.
- Payment Summary: Users can view payment summaries for each order placed.
- Order History: Users have access to their order history to track previous purchases.

## Getting Started

To run the Trend Zone app locally, follow these steps:

1. Clone the GitHub repository:

   ```
   git clone https://github.com/karanupadhyaya03/trend-zone.git
   ```

2. Create .env File

- in the server directory, create a .env file
- the .env file should contain MongoDB URI and PayPal Client ID

3. Setup MongoDB Atlas

- create a MongoDB Atlas account
- create a cluster
- create a database and collection
- add the MongoDB URI to the .env file

4. Setup PayPal

- paypal client id can be obtained from [https://developer.paypal.com/developer/applications/](https://developer.paypal.com/developer/applications/)
- add the PayPal Client ID to the .env file

5. Run Server
   ```
   cd server
   npm install
   npm start
   ```
6. Run Client

   ```
   cd server
   npm install
   npm start
   ```

7. Seed Users and Products
   Run this on browser: http://localhost:5000/api/seed
   It returns admin email and password and 6 sample products

8. Admin Login
   Run http://localhost:3000/signin
   Enter admin email and password and click signin

9. Build the app:

   ```
   npm run build
   ```

10. Start the server:

```
npm start
```

## Planned Features

The following features are planned to be implemented in the future:

- Search Functionality: Implement a search box with applied filters for easy product discovery.
- Admin Dashboard: Develop an admin dashboard to manage products, orders, and users efficiently.
- Google OAuth 2.0 Integration: Allow users to log in using their Google accounts for a seamless experience.

## Issue Reporting

If you encounter any issues while using Trend Zone or have any suggestions for improvement, please report them on the GitHub repository's Issues page: [https://github.com/karanupadhyaya03/trend-zone/issues](https://github.com/karanupadhyaya03/trend-zone/issues)
