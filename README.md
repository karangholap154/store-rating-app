# 🏪 Store Rating App – Full Stack Assignment (Roxiler Systems)

A full-stack web application to rate stores with role-based access (Admin, Store Owner, Normal User).

## 🚀 Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL + Sequelize ORM
- **Auth**: JWT + bcrypt

---

## 👤 User Roles and Features

### 🔐 Authentication
- Register/Login with role selection
- Password hashing with bcrypt
- JWT-based auth for protected routes

### 👨‍💼 Admin
- Add users (normal/admin)
- Add stores linked to owners
- View dashboard: user/store/rating count
- Filter & search users/stores

### 🧑‍💼 Store Owner
- View list of users who rated their store
- See average rating of their store

### 🙋 Normal User
- View/search all stores
- Submit or update rating (1–5)

---

## 📁 Project Setup

```bash
git clone https://github.com/yourusername/store-rating-app.git
cd store-rating-app
