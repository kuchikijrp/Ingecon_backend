const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const RequestMounts = require('../models/RequestMounts');

const connection = new Sequelize(dbConfig);

User.init(connection);
RequestMounts.init(connection);


module.exports = connection;