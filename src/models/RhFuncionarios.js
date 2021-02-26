const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');

class tblRhFuncionarios extends Model {
    static init(sequelize) {
        super.init({
            nr_matricula: DataTypes.INTEGER,
            nm_nome: DataTypes.STRING,
            nm_cargo: DataTypes.STRING,
            nm_centro_custo: DataTypes.STRING,
            nm_lotacao: DataTypes.STRING
        },
            {
                sequelize,
                tableName: 'tbl_RH_FUNCIONARIOS'
            }
        );
    }
}

module.exports = tblRhFuncionarios;