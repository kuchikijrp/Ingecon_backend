const User = require('../models/User');
const sysRules = require('../models/Rules');
const bcrypt = require('bcryptjs');

const generateToken = require('../config/generateToken');

module.exports = {
    async store(req, res) {
        const { usuario, password } = req.body;
        try {
            
            const user = await User.findOne({ where: { usuario } });
            // console.log({user})
            
            if (!user)
            return res.send({ 'error': 'Usuário não encontrado' });
            
            const reset = user.reset_pass;
            // console.log(password , user.password);
            if(user.reset_pass === 1){
                if (password !== user.password){
                    // return res.send({ 'error': 'Senha invalida' })
                    return res.json({ error: 'Senha invalida' })
                }
            }else{
                // console.log(await bcrypt.compare(password, user.password));
                if (!await bcrypt.compare(password, user.password))
                    return res.json({ error: 'Senha invalida' })
            }
            
            
            user.password = undefined;
            user.reset_pass = reset;
            const token = generateToken(user.id);
            

            //busca rules usuario
            const rules = await sysRules.findAll({where: {user_id : user.id}, attributes: {exclude: ['user_id', 'createdAt', 'updatedAt']}})

            // console.log(user)
            return res.send({ user, token, rules });

        } catch (error) {
            return res.send(error)
        }
    }
}