module.exports = (sequelize, DataTypes) => {
  return sequelize.define("rating", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
  });
};
