const sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('approval_mounts', {
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
      user_name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      mount_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'request_mounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      status: {
        type: Sequelize.STRING,
      },
      obs:{
        type: Sequelize.TEXT
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
      return queryInterface.dropTable('approval_mounts');
  }
};
