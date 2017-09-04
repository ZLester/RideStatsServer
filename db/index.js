const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = db;
