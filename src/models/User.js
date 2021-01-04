const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Users extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            usuario: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            reset_pass: DataTypes.STRING,
        },
            {
                hooks: {
                    // beforeCreate: async (user, options) => {
                    //     console.log('create senha')
                    //     user.password = await bcrypt.hash(user.password, 10);
                    // },
                    // beforeUpdate: async (user, option) => {
                    //     console.log('up senha')
                    //     user.password = await bcrypt.hash(user.password, 10);
                    // },
                    beforeBulkUpdate: async (user) => {
                        console.log(user.attributes)
                        user.attributes.password = await bcrypt.hash(user.attributes.password, 10);
                    }
                },
                sequelize
            }
        );
    }

    static associate(models){
    }
    
}

module.exports = Users;