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
      vl_alimentacao:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_material:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_deslocamento:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_combustivel:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_passagem:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_hospedagem:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_diarias:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_terceiros:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_impostos:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_outros:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      vl_desp_total:{
        type: Sequelize.DOUBLE,
        allowNull: true
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
