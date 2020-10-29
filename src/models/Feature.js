const { Model, DataTypes } = require('sequelize');

class SysFeature extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        },
            {
                sequelize
            }
        );
    }
}

module.exports = SysFeature;