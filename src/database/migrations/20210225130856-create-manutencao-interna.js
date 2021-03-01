'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('manutencao_interna', {
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
        titulo_problema: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        local_ocorrencia: {
          type: Sequelize.STRING,
          allowNull: false,
        }, 
        equipamento: {
          type: Sequelize.STRING,
          allowNull: false,
        }, 
        situacao_equipamento: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tipo_manutencao: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tipo_servico: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descricao_problema: {
          type: Sequelize.TEXT,
          allowNull: false,
        },     
        id_tecnico: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'Users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
        },
        tipo_atendimento: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        inicio_atendimento: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        fim_atendimento: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: true,
        },  
        parecer_tecnico: {
          type: Sequelize.TEXT,
          allowNull: true,
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
      return queryInterface.dropTable('manutencao_interna');
  }
};
