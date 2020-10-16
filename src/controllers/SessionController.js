const User = require('../models/User');
const bcrypt = require('bcryptjs');

const generateToken = require('../config/generateToken');

module.exports = {
    async store(req, res) {
        const { usuario, password } = req.body;

        const user = await User.findOne({ where: { usuario } });
        if (!user)
            return res.send({ 'error': 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.send({ 'error': 'Invalid password' })

        user.password = undefined;
// console.log(user)
        const token = generateToken(user.id);

        return res.send({ user, token });
    }
}