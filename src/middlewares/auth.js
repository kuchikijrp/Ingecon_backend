const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.send({ error: 'No token provided' });

    const parts = authorization.split(' ');
    if (!parts.length === 2)
        return res.send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.send({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.send({ error: 'Token invalid' });
        

        
        req.userId = decoded.user_id;
        return next();
    })
}