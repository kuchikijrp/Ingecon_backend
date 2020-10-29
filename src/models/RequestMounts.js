const { Model, DataTypes } = require('sequelize');

class RequestMounts extends Model {
    static init(sequelize) {
        super.init({
            // request_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            type: DataTypes.STRING,
            id_at: DataTypes.STRING,
            client: DataTypes.INTEGER,
            store: DataTypes.STRING,
            contact_store: DataTypes.STRING,
            type_work: DataTypes.STRING,
            start_work: DataTypes.DATE,
            end_work: DataTypes.DATE,
            qtd_fitters: DataTypes.INTEGER,
            budgeted: DataTypes.STRING,
            time_discharge: DataTypes.STRING,
            time_work: DataTypes.STRING,
            obs: DataTypes.TEXT,
            status: DataTypes.STRING
        },
            {
                sequelize
            }
        );
    }
}

module.exports = RequestMounts;