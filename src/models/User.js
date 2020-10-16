const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Users extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            usuario: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
            {
                hooks: {
                    beforeCreate: async (user, options) => {
                        user.password = await bcrypt.hash(user.password, 10);
                    }
                },
                sequelize
            }
        );
    }
}

module.exports = Users;