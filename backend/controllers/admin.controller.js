const db = require("../models");
const Store = db.store;
const User = db.user;
const Rating = db.rating;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Admin: Create a new store
exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const owner = await User.findByPk(ownerId);
    if (!owner || owner.role !== "owner") {
      return res.status(400).json({ message: "Invalid store owner ID" });
    }

    const store = await Store.create({ name, email, address, ownerId });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create store", error: err.message });
  }
};

// Admin: Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err.message });
  }
};

// Admin: Get dashboard summary (total users, stores, ratings)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.status(200).json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

// Admin: List all users with filtering
exports.getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (email) filters.email = { [Op.iLike]: `%${email}%` };
    if (address) filters.address = { [Op.iLike]: `%${address}%` };
    if (role) filters.role = role;

    const users = await User.findAll({
      where: filters,
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// Admin: List all stores with filtering + average rating
exports.getAllStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (email) filters.email = { [Op.iLike]: `%${email}%` };
    if (address) filters.address = { [Op.iLike]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email"],
        },
        {
          model: Rating,
          attributes: ["rating"],
        },
      ],
      order: [["name", "ASC"]],
    });

    // Calculate average rating
    const storesWithRatings = stores.map((store) => {
      const ratings = store.ratings || [];
      const averageRating = ratings.length
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
        : "N/A";

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        averageRating,
      };
    });

    res.status(200).json({ stores: storesWithRatings });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stores", error: err.message });
  }
};
