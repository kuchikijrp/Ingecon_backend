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
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('sys_menu_arvores');
    
  }
};
