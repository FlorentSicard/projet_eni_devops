// Configuration Jest pour les tests
// Augmente le timeout pour les tests de base de données
jest.setTimeout(10000);

// Variables d'environnement pour les tests
process.env.NODE_ENV = 'test';
