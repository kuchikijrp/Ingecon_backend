const { Model, DataTypes } = require('sequelize');

class SysMenuArvore extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            parent: DataTypes.INTEGER,
            route: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            menu: DataTypes.BOOLEAN
        },
            {
                sequelize
            }
        );
    }
}

module.exports = SysMenuArvore;