const { Sequelize, DataTypes } = require('sequelize');
const dbTestConfig = require('../../src/config/db.test.config');

// Créer une instance Sequelize pour les tests avec SQLite en mémoire
const sequelize = new Sequelize({
  dialect: dbTestConfig.dialect,
  storage: dbTestConfig.storage,
  logging: dbTestConfig.logging,
  pool: dbTestConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Charger le modèle Task
db.task = require('../../src/models/task.model.js')(sequelize, DataTypes);

module.exports = db;
