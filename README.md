# 🏪 Store Rating App – Roxiler Systems Assignment

A full-stack web application that allows users to register, log in, and rate stores. It includes role-based access for:

- 🔐 Admin
- 👤 Normal User
- 🧑‍💼 Store Owner

---

## 🚀 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL + Sequelize ORM
- **Auth**: JWT, bcryptjs

---

## 👤 User Roles and Features

### 🔐 Admin
- Create users (normal/admin)
- Create stores (assign to owners)
- View dashboard stats (users, stores, ratings)
- List/filter users and stores

### 🧑‍💼 Store Owner
- View users who rated their store
- See average rating of their store

### 👤 Normal User
- View/search stores
- Submit or update ratings (1–5)

---

## 🧾 Project Setup

### 🔧 Backend

```bash
cd backend
npm install
npx nodemon server.js
