const { Model, DataTypes } = require('sequelize');

class MenuArvore extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            parent: DataTypes.INTEGER
        },
            {
                sequelize
            }
        );
    }
}

module.exports = MenuArvore;