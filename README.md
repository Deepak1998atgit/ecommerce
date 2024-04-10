# E-commerce Application

This is an e-commerce application where users can perform various actions related to authentication, product management, and cart management.

## Features

- **Authentication:** Users can register, login, and logout securely. Authorization is implemented to ensure that only authenticated users can access certain parts of the application.

- **Product Management:** users have the ability to manage products. This includes listing, adding, updating, and deleting products.

- **Cart Management:** Users can add products to their cart, view the contents of their cart, update the quantity of items in the cart, remove individual items  and remove the entire cart.

## Implemented Functionality

- **User Authentication:**
  - Register: Users can create a new account by providing necessary details such as firstName,mobile, email, and password
  - Login: Authenticated users can log in securely using their credentials using email and password.
  - Logout: Users can securely log out of their accounts.

- **Product Management:**
  - Listing:  users can view a list of all products available in the system.
  - Adding: users can add new products to the system by providing details such as name, description, price, images, and rating.
  - Updating: users can update the details of existing products using productId on params.
  - Deleting: users can delete products from the system using productId on params.

- **Cart Management:**
  - Adding to Cart: Authenticated users can add products to their cart.
  - Viewing Cart: Authenticated Users can view the contents of their cart, including the list of products .
  - Updating Quantity: Authenticated Users can update the quantity of items in their cart using productId and quantity on params.
  - Removing Items: Authenticated Users can remove individual items from their cart using productId on params.
  - Removing Entire Cart: Authenticated Users can remove all items from their cart in one go.

## Technologies Used


- **Backend:** NODE JS
- **Database:** MONGODB
- **Authentication:** JWT

## Setup Instructions

- Clone the repository.
- Install dependencies using `npm install`.
- Run the application using `npm start`.
- Access the application in your browser at `http://localhost:your-port`.



