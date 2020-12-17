const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');

class sys_rules extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            user_id: DataTypes.INTEGER
        },
            {
                sequelize
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'rulesToUser'})
    }
}

module.exports = sys_rules;