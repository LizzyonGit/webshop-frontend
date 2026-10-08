# Sky Market

Sky Market is an e-commerce web application built with Next.js, React, and TypeScript.
Users can browse, search and filter products, view product details, manage their shopping cart, and create an account.


Sky Market uses Prisma ORM to manage database access. The application uses Next.js API routes for server-side functionality.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Learn More](#learn-more)
- [Future Additions](#future-additions)
- [Definition of Done](#definition-of-done)
- [License](#license)
- [Authors](#authors)
  
## Features

- Browse products
- Search, filter and sort products
- View product details
- Add products to the shopping cart
- Update quantities, remove products and clear the cart with confirmation
- View order summary and checkout
- Create a user account
- Log in and manage authentication

## Usage

1. Open the application.
2. Browse, search, filter, or sort products.
3. Click on a product to view its details.
4. Add products to the shopping cart.
5. Update quantities or remove products from the cart.
6. Review the order summary and proceed to checkout.
7. Create an account or log in to access account features.



## Getting Started

First, install the dependencies:

```bash
npm install

```

To start the development server, run:

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` to view the application.


## Architecture

Sky Market is built with Next.js using the App Router and React with TypeScript.

The project is organized into separate areas for pages, reusable components, services, server logic, and database functionality.

### Project Structure

```text

app/          - Pages, routes, API routes, and layouts
components/   - Reusable React components
services/     - Application services
prisma/       - Database schema and database setup
public/       - Static files and images
lib/          - Shared utilities and application logic
```

## Screenshots

![Sky Market homepage with navigation bar and hero image featuring a handbag, headphones, smartphone, watch and nail polish](image-3.png)
![Sky Market product list showing women's watches with search, category and sorting filters](image-4.png)
![Sky Market product list with pagination and footer navigation](image-7.png)
![Sky Market car product page with product information, price, quantity selector, Add to cart button and confirmation that the product was added to the cart](image-9.png)
![Sky Market account login page with email and password fields, login button and account options](image-11.png)
![Sky Market shopping cart and checkout page for a logged-in user with order summary and quantity controls](image-14.png)
![Sky Market responsive mobile homepage with hamburger menu and hero image](image-12.png)
![Sky Market responsive mobile product list with product card and pagination](image-13.png)


## Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Better Auth
- shadcn/ui

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
DATABASE_URL=
DIRECT_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
RESEND_API_KEY=
CONTACT_EMAIL=
```

> Never commit your `.env` file or expose secret values.

### Database Setup

Generate the Prisma client:

```bash
npm run prisma:generate
```
Run the database migrations:

```bash
npm run prisma:migrate
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Future Additions

- Continue improving responsive design across the application.
- Add and update screenshots as the application develops.
- Continue improving the customer and admin experience.


## Definition of Done

- The feature has been tested by two group members on the relevant branch through PR review.
- The acceptance criteria are fulfilled.
- The code is complete and understandable.
- TypeScript compiles without errors.
- ESLint has no relevant errors.
- The feature works together with the rest of the application.
- The feature has been merged into the group's shared development branch.
- No known critical errors remain.
- The GitHub issue has been updated.
- The application has been successfully deployed to Vercel.

## License

This project is licensed under the MIT License.

## Authors
-[Patrik Idén](https://github.com/patrikiden-dev)
-[Lizzy van Rhijn](https://github.com/LizzyonGit)
-[Leo Leksell](https://github.com/leo98lxl)
-[David Söderberg](https://github.com/dame9785)
-[Perjin Shavani](https://github.com/perjinshavani)




