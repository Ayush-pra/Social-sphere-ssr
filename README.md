# 🌐 Social Sphere SSR

A **Server-Side Rendered (SSR) social networking platform** built using the Node.js ecosystem. This project focuses on **secure authentication**, **dynamic content delivery**, and **efficient data handling** to deliver a smooth and responsive user experience.

---

## 🚀 Features

### 🔐 Authentication & Security

* Secure user registration and login system
* JWT (JSON Web Tokens) for session management
* Password hashing using Bcrypt
* Cookie-based authentication using cookie-parser

### 📝 Post Management (CRUD)

* Create, read, update, and delete text-based posts
* Efficient handling of user-generated content

### ❤️ Interactive Engagement

* Like and Unlike functionality for posts
* Real-time interaction with user content

### 👤 User Profiles

* Dedicated profile pages for each user
* Displays user data, bio, and post history

### 🎨 Profile Customization

* Upload and update profile pictures using Multer
* Personalized bio management

### 🔍 Global User Search

* Real-time user search using MongoDB regex
* Easily discover and connect with other users

### ⚡ Dynamic Templating

* Server-side rendering using EJS (Embedded JavaScript)
* Fast and SEO-friendly content delivery

---

## 🛠️ Tech Stack

| Category               | Technologies Used          |
| ---------------------- | -------------------------- |
| **Backend**            | Node.js, Express.js        |
| **Database**           | MongoDB (Mongoose)         |
| **Authentication**     | JWT, Bcrypt, Cookie-parser |
| **View Engine**        | EJS                        |
| **File Handling**      | Multer                     |
| **Environment Config** | Dotenv                     |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/social-sphere-ssr.git
cd social-sphere-ssr
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
JWT_SECRET=your_secret_key
PORT=3002
```

### 4️⃣ Start the Server

```bash
npm start
```

---

## 🔒 Security Implementation

* **Protected Routes:**
  Middleware (`isLoggedIn`) ensures only authenticated users can access sensitive endpoints

* **Data Privacy:**
  Passwords are securely hashed and never stored in plain text

* **Environment Safety:**
  Sensitive configurations like JWT secrets and ports are managed via `.env`

---

## 📌 Future Enhancements

* Real-time chat system
* Notifications system
* Image/video post support
* Follow/Unfollow functionality
* REST API + frontend separation (React/Vue)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 💡 Author

Developed as part of a full-stack learning journey to build scalable and secure web applications using Node.js.

---
