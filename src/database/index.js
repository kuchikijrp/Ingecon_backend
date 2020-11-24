const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

//MENU
const MenuArvore = require('../models/MenuArvore')
MenuArvore.init(connection);

//TELAS
const Feature = require('../models/Feature')
Feature.init(connection)

//USUARIOS
const User = require('../models/User');
User.init(connection);

//ACESSOS

//SOLICITACAO MONTAGEM
const RequestMounts = require('../models/RequestMounts');
RequestMounts.init(connection);

//CADASTRO CLIENTES FILIAL
const CadastroClienteFilial = require('../models/CadastroClienteFilial')
CadastroClienteFilial.init(connection);


module.exports = connection;