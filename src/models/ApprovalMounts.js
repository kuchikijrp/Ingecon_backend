const { Model, DataTypes } = require('sequelize');

const RequestMounts = require('../models/RequestMounts');
const User = require('../models/User');

class approvalMounts extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            // mount_id : DataTypes.INTEGER,
            user_name: DataTypes.STRING,
            status: DataTypes.STRING,
            obs: DataTypes.STRING,
        },
            {
                sequelize,
                tableName: 'approval_mounts'
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'approvalsToUser'});
        this.belongsTo(models.RequestMounts, { foreignKey: 'mount_id', as: 'approvalsToMounts'})
    }
}

module.exports = approvalMounts;