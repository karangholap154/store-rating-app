# 🏬 Store Rating App – Full Stack Assignment

This is a full-stack web application that allows users to rate stores. It features role-based access for **System Administrator**, **Store Owner**, and **Normal User**. Built as part of an internship coding challenge.

---

## 🔐 Demo Login Credentials

| Role   | Email                | Password   |
|--------|----------------------|------------|
| Admin  | admin@example.com    | Admin@123   |
| Owner  | owner@example.com    | Owner@123   |
| User   | user@example.com     | User@123    |

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Auth:** JWT, BcryptJS
- **Database:** PostgreSQL (via Sequelize ORM)

---

## 📁 Features by Role

### 👨‍💼 Admin
- View total users, stores, ratings
- Add users (admin, owner, user)
- Add store and assign owner
- View list of users and stores
- Update password, logout

### 👤 User
- Login & browse all stores
- Submit/modify store ratings
- View own ratings
- Update password, logout

### 🏪 Store Owner
- See their assigned store
- View average rating
- See users who rated their store
- Update password, logout

---

## 🗃️ Database Schema

### Tables:
- `users`: id, name, email, password, address, role
- `stores`: id, name, email, address, ownerId (FK)
- `ratings`: id, rating (1–5), userId (FK), storeId (FK)

📎 Refer to `schema.png` for the visual schema diagram.

---

## 🔐 Authentication & Authorization

- Secure login with JWT tokens
- Role-based access middleware
- Passwords hashed with bcryptjs

---
