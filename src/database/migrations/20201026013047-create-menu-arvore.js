'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('sys_menu_arvores',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parent:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      route:{
        type: Sequelize.STRING,
        allowNull: false
      },
      status:{
        type: sequelize.BOOLEAN,
        allowNull: false
      },
      menu:{
        type: sequelize.BOOLEAN,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
        }).then(function(){
          queryInterface.bulkInsert('sys_menu_arvores', [{
            name: 'Administração Sistema',
            parent: null,
            route: '',
            status: 1,
            menu: 1
          }, {
            name: 'Usuários',
            parent: 1,
            route: 'users',
            status: 1,
            menu: 1
          }, 
          {
            name: 'Montagem Externa',
            parent: null,
            route: '',
            status: 1,
            menu: 1
          },
          {
            name: 'Minhas Solicitações',
            parent: 3,
            route: 'solicitacoesMontagem',
            status: 1,
            menu: 1
          },
          {
            name: 'Manutenção Interna',
            parent: null,
            route: '',
            status: 1,
            menu: 1
          },
          {
            name: 'Minhas Solicitações',
            parent: 5,
            route: 'ManutencaoInterna',
            status: 1,
            menu: 1
          },
        ]);
          // queryInterface.sequelize.query("insert into sys_menu_arvores (name, parent, route, status, menu) values('Administração Usuários', null, 'null', '1', '1'), insert into sys_menu_arvores (name, parent, route, status, menu) values('Usuários', 1, 'users', '1', '1')")
          // queryInterface.sequelize.query("insert into sys_menu_arvores (name, parent, route, status, menu) values('Usuários', 1, 'users', '1', '1')")
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('sys_menu_arvores');
    
  }
};
