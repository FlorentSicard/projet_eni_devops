// Configuration de base de données pour les tests
module.exports = {
  dialect: 'sqlite',
  storage: ':memory:', // Base de données en mémoire
  logging: false, // Désactive les logs SQL pendant les tests
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
