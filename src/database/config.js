/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'bidlog',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: 'sequelize'
  },
};
