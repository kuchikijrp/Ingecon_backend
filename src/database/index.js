const Sequelize = require('sequelize');
const dbConfig = require('../config/database');


const Rules = require('../models/Rules')

const User = require('../models/User');
const MenuArvore = require('../models/MenuArvore')
const Feature = require('../models/Feature')
const RequestMounts = require('../models/RequestMounts');
const ApprovalMounts = require('../models/ApprovalMounts');
const CadastroClienteFilial = require('../models/CadastroClienteFilial');
const FormaPagamento = require('../models/FormaPagamento');

const connection = new Sequelize(dbConfig);


Rules.init(connection);

User.init(connection);
MenuArvore.init(connection);
Feature.init(connection)
RequestMounts.init(connection);
// ApprovalMounts.init(connection);;
ApprovalMounts.init(connection);
CadastroClienteFilial.init(connection);
FormaPagamento.init(connection);

User.associate(connection.models);
RequestMounts.associate(connection.models);
ApprovalMounts.associate(connection.models);

module.exports = connection;