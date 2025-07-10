const db = require("../models");
const Store = db.store;
const Rating = db.rating;
const { Op } = require("sequelize");

exports.getAllStores = async (req, res) => {
  try {
    const { name, address } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (address) filters.address = { [Op.iLike]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      include: [
        {
          model: Rating,
          attributes: ["rating", "userId"],
        },
      ],
    });

    const userId = req.user.id;

    const storeList = stores.map((store) => {
      const ratings = store.ratings || [];

      const userRatingObj = ratings.find((r) => r.userId === userId);
      const userRating = userRatingObj ? userRatingObj.rating : null;

      const averageRating = ratings.length
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
        : "N/A";

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating,
        userRating,
      };
    });

    res.status(200).json({ stores: storeList });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stores", error: err.message });
  }
};

exports.submitOrUpdateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const existingRating = await Rating.findOne({
      where: { userId, storeId },
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ message: "Rating updated successfully" });
    } else {
      await Rating.create({ userId, storeId, rating });
      return res.status(201).json({ message: "Rating submitted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to submit rating", error: err.message });
  }
};
