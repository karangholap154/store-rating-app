const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

// ✅ Sequelize with SSL enabled for Render
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT,
  dialectOptions: dbConfig.dialectOptions, // SSL config from db.config.js
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
