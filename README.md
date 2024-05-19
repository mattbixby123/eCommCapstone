**Project Overview:

Retro Rag Reads is an e-commerce website designed to offer a unique shopping experience for enthusiasts of vintage books, magazines, and comic books. Our platform provides a diverse range of reading materials from various genres, ensuring there is something for everyone.



**Purpose:

The purpose of this project is to create a user-friendly and visually appealing e-commerce platform that allows users to browse, search, and purchase collecatable vintage reading materials with ease. This project demonstrates the implementation of modern web development techniques and best practices.



**Features:

*Browse and Search: Users can explore a wide range of the available books, magazines, and comic books. Advanced search functionality allows users to find specific titles or genres.

*Filtering: Users can filter products by price range and categories using checkboxes for a more customized shopping experience.

*Cart Management: Users can add items to their cart, view their selections, and proceed to checkout.

*User Authentication: Secure user registration and login to manage orders and preferences.



**Technologies Used:

Frontend: React, Redux Toolkit Query (RTK Query)

Backend: Node.js, Express

Database: Prisma, SQL

Styling: CSS, styled-components

Version Control: Git, GitHub



**Installation:

1. Clone repo:

   git@github.com:mattbixby123/eCommCapstone.git


2. Navigate to the project directory:

   cd eCommCapstone

3. Install packages

   npm install
   
   npm install prisma --save-dev

5. Create a database from your terminal

    a: Ensure postgreSQL is installed, use command in termial: postgres --version
   
    b: createdb (**db_name_here**)

7. Migrate table data

   npx prisma migrate dev

8. Start the development server

   npm start

   

**Usage:

Start the program on your localhost:

   a: npm run dev
   
   b: Open localhost: http://localhost:3000
   
   c: Browse available vintage books, comics, and magazines for purchase
   
   d: Use filter by price, or search by category
   
   e: Add items to your cart and proceed to checkout
   
   
   
**Conclusion

Retro Rag Reads is a comprehensive e-commerce platform for vintage print media enthusiasts. This project demonstrates the integration of various technologies and the implementation of essential e-commerce functionalities. Feedback is welcome to further enhance this platform.
