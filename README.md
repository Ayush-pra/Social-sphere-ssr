Social Sphere SSR
A robust, Server-Side Rendered (SSR) social networking platform built with the Node.js ecosystem. This project focuses on secure authentication, dynamic content delivery, and efficient data handling for a seamless user experience.

Features
User Authentication & Security: Secure registration and login system using JWT (JSON Web Tokens) for session management and Bcrypt for password hashing.
Post Management (CRUD): Full capability to create, read, update, and delete text-based posts.
Interactive Engagement: Built-in "Like" and "Unlike" functionality for user posts.
User Profiles: Dedicated profile pages displaying user-specific data, bio content, and post history.
Profile Customization: Support for uploading and updating profile pictures using Multer and managing personal bios.
Global User Search: Real-time search functionality using MongoDB regex to find and view other users' profiles.
Dynamic Templating: Utilizes EJS (Embedded JavaScript) for server-side rendering of views and data.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (via Mongoose)
Authentication: JWT, Bcrypt, Cookie-parser
View Engine: EJS
File Handling: Multer
Environment Management: Dotenv

Installation & Setup
Clone the repository:
git clone https://github.com/your-username/social-sphere-ssr.git
cd social-sphere-ssr

Install dependencies:
npm install
Configure Environment Variables:
Create a .env file in the root directory and add:

JWT_SECRET=your_secret_key
PORT=3002
Start the server:
npm start

Security Implementation
The application includes:
Protected Routes: isLoggedIn middleware to verify tokens before accessing sensitive data.
Data Privacy: Passwords are never stored in plain text.
Environment Safety: Sensitive keys and port configurations are managed via .env.
