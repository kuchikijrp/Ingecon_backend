const { DATE } = require('sequelize');
const { Model, DataTypes } = require('sequelize');

class ManutencaoInterna extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            titulo_problema: DataTypes.STRING,
            local_ocorrencia: DataTypes.STRING,
            equipamento: DataTypes.STRING,
            situacao_equipamento: DataTypes.STRING,
            tipo_manutencao: DataTypes.STRING,
            tipo_servico: DataTypes.STRING,
            descricao_problema: DataTypes.TEXT,
            id_tecnico: DataTypes.INTEGER,
            inicio_atendimento: DataTypes.DATE,
            fim_atendimento: DataTypes.DATE,
            status: DataTypes.STRING,
            parecer_tecnico: DataTypes.TEXT
        },
            {
                sequelize,
                tableName: 'manutencao_interna'
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'manutencoesToUser'})
        this.belongsTo(models.Users, { foreignKey: 'id_tecnico', as: 'manutencoesToTecnico'})
    }
}

module.exports = ManutencaoInterna;