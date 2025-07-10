module.exports = (sequelize, DataTypes) => {
  return sequelize.define("store", {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(400),
    },
  });
};
