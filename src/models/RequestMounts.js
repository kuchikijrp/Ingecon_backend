const { Model, DataTypes } = require('sequelize');

const User = require('../models/User');

class RequestMounts extends Model {
    static init(sequelize) {
        super.init({
            // request_id: DataTypes.INTEGER,
            // user_id: DataTypes.INTEGER,
            type: DataTypes.STRING,
            id_at: DataTypes.STRING,
            client: DataTypes.INTEGER,
            store: DataTypes.STRING,
            contact_store: DataTypes.STRING,
            contact_phone: DataTypes.STRING,
            type_work: DataTypes.STRING,
            start_work: DataTypes.DATE,
            end_work: DataTypes.DATE,
            qtd_fitters: DataTypes.INTEGER,
            budgeted: DataTypes.STRING,
            form_pagto: DataTypes.STRING,
            time_discharge: DataTypes.STRING,
            time_work: DataTypes.STRING,
            obs: DataTypes.TEXT,
            vl_alimentacao: DataTypes.STRING,
            vl_material: DataTypes.STRING,
            vl_deslocamento: DataTypes.STRING,
            vl_combustivel: DataTypes.STRING,
            vl_passagem: DataTypes.STRING,
            vl_hospedagem: DataTypes.STRING,
            vl_diarias: DataTypes.STRING,
            vl_terceiros: DataTypes.STRING,
            vl_outros: DataTypes.STRING,
            vl_tx_adm_equipe: DataTypes.STRING,
            vl_impostos: DataTypes.STRING,
            vl_desp_total: DataTypes.STRING,
            status: DataTypes.STRING
        },
            {
                sequelize
            }
        )
    }

    static associate(models){
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'mountsToUser'})
    }
}

module.exports = RequestMounts;