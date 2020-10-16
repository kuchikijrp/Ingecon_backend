
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(user_id){
    const user = user_id+ '' ;
    // console.log(user)
    const token = jwt.sign({ user }, authConfig.secret, {
        subject: user,
        expiresIn: 86400,
    })

    return token;
}

module.exports = generateToken;