'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('sys_rules', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
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
        queryInterface.bulkInsert('sys_rules', [{
          user_id: 1,
          name: 'ROLE_SUPER',
        }]);
      });
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('sys_rules');
  }
};
