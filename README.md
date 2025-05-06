# Bike Zone 🚴‍♂️

Live Site: [https://bike-zone-six.vercel.app/](https://bike-zone-six.vercel.app/)

## Overview

Bike Zone is a full-stack bike shop application built to provide a seamless shopping experience for customers. It includes secure authentication, product browsing, admin management, and real-time order handling.

---

## Features

### 🔐 Authentication & Authorization
- User registration with name, email, and password (default role: customer).
- Secure login with hashed passwords.
- JWT-based authentication stored in local storage.
- Role-based access: customer and admin.
- Logout functionality clears session.

### 🌐 Public Pages
- **Home Page**: Includes navbar, banner, featured products (max 6), extra content section, and footer.
- **All Products Page**:
  - Search by brand, bike name, or category.
  - Filter by price, model, brand, category, availability.
  - Dynamic updates based on filters.
- **Product Details Page**: Shows full product info with a “Buy Now” button.
- **About Page**: Contains information about the business.

### 🔒 Private Pages
- **Checkout Page**:
  - Product purchase with quantity validation.
  - Includes user info, product details, total price, and SurjoPay payment integration.
- **Dashboard**:
  - **Admin**:
    - Manage products (CRUD).
    - Manage users (e.g., deactivate).
    - Manage orders (CRUD).
  - **User**:
    - View orders and profile.
    - Update password with current password verification.

---

## UI & UX
- Fully responsive design for all screen sizes.
- Clean layout, intuitive navigation.
- Error handling for:
  - Invalid login
  - Duplicate registration
  - Out-of-stock products
- Loading spinners during async operations.
- Toast notifications for actions like login, order placement, etc.

---

## Backend Highlights
- MongoDB for data storage.
- Collections:
  - `users`: name, email, password, role
  - `products`: name, price, brand, model, stock, etc.
  - `orders`: user reference, product info, total price, status
- Express.js for API endpoints.
- JWT-based authentication middleware.
- CRUD APIs for products, users, and orders.
- SurjoPay integration for secure payments.
- API supports pagination for products and orders.

---

## Tech Stack
- Frontend: React, Redux, TypeScript, Tailwind CSS, React Router
- Backend: Node.js, Express.js, MongoDB, JWT
- Payment: SurjoPay
- Deployment: Vercel (client), Render (server)

---

# Bike_Zone
