'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('request_mounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_at: {
        type: Sequelize.STRING,
      },
      client: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      store: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_store: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact_phone:{
        type: Sequelize.STRING,
        allowNull: false
      },
      type_work: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_work: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_work: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      qtd_fitters:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      budgeted: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      time_discharge: {
        type: Sequelize.STRING
      },
      time_work: {
        type: Sequelize.STRING
      },
      obs:{
        type: Sequelize.TEXT
      },
      status:{
        type: Sequelize.STRING
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
    return queryInterface.dropTable('request_mounts');
  }
};
