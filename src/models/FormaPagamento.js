const { Model, DataTypes } = require('sequelize');

class FormPagto extends Model {
    static init(sequelize) {
        super.init({
            // id: DataTypes.INTEGER,
            nr_condicao_pagto: DataTypes.INTEGER,
            nm_desc_condicao_pagto: DataTypes.STRING,
            nm_vencimento: DataTypes.STRING,
        },
            {
                sequelize,
                tableName: 'tbl_DEPARA_PRAZO_PAGTO'
            }
        );
    }
}

module.exports = FormPagto;