const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//MENU
const MenuArvore = require('../models/MenuArvore')

//TELAS
const Feature = require('../models/Feature')

//USUARIOS
const User = require('../models/User');

//ACESSOS

//SOLICITACAO MONTAGEM
const RequestMounts = require('../models/RequestMounts');

const connection = new Sequelize(dbConfig);

//MNEU
MenuArvore.init(connection);

//TELAS
Feature.init(connection)

//USUARIO
User.init(connection);

//SOLICTACAO MONTAGEM
RequestMounts.init(connection);


module.exports = connection;