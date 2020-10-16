const User = require('../models/User');

const generateToken = require('../config/generateToken');

module.exports = {
    async store(req, res) {
        const { name, usuario, email, password } = req.body;

        let user = await User.findOne({ where: { email } });

        if (!user)
            user = await User.create({ name, usuario, email, password });

        user.password = undefined;

        const token = generateToken(user.id);

        return res.json({user, token});
    },

    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async destroy(req, res) {
        const { email } = req.params;

        try{
            await User.destroy({ where: { email } });
            return res.send({'msg' : 'Success delete user'});

        }catch(err){
            console.log(err);
        }
    }
};