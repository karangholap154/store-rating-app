# 🏪 Store Rating App – Roxiler Systems Assignment

A full-stack web application for store ratings with role-based access:
- 🔐 Admin
- 👤 Normal User
- 🧑‍💼 Store Owner

---

## ⚙️ Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL + Sequelize ORM
- **Authentication**: JWT, bcrypt.js

---

## 👤 User Roles

### 🛡️ Admin
- Create stores and users
- View dashboard stats (users, stores, ratings)
- List & filter users/stores

### 🧑‍💼 Store Owner
- View users who rated their store
- Get average rating

### 👤 Normal User
- View/search stores
- Submit or update store ratings

---

## 📁 Project Structure

```bash
store-rating-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
├── frontend/
│   └── (React app files)
