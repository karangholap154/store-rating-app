const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model.js")(sequelize, DataTypes);
db.store = require("./store.model.js")(sequelize, DataTypes);
db.rating = require("./rating.model.js")(sequelize, DataTypes);

// Relationships
db.user.hasMany(db.rating);
db.rating.belongsTo(db.user);

db.store.hasMany(db.rating);
db.rating.belongsTo(db.store);

db.user.hasMany(db.store, { foreignKey: 'ownerId' });
db.store.belongsTo(db.user, { as: 'owner', foreignKey: 'ownerId' });

module.exports = db;
