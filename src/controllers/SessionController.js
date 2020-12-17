const User = require('../models/User');
const sysRules = require('../models/Rules');
const bcrypt = require('bcryptjs');

const generateToken = require('../config/generateToken');

module.exports = {
    async store(req, res) {
        const { usuario, password } = req.body;
        try {
            
            const user = await User.findOne({ where: { usuario } });
            if (!user)
            return res.send({ 'error': 'Usuário não encontrado' });
            
            if (!await bcrypt.compare(password, user.password))
            return res.send({ 'error': 'Senha invalida' })
            
            user.password = undefined;
            // console.log(user)
            const token = generateToken(user.id);
            

            //busca rules usuario
            const rules = await sysRules.findAll({where: {user_id : user.id}, attributes: {exclude: ['user_id', 'createdAt', 'updatedAt']}})

            return res.send({ user, token, rules });

        } catch (error) {
            return res.send(error)
        }
    }
}