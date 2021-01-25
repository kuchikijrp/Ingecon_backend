const User = require('../models/User');
const Rules = require('../models/Rules');

const generateToken = require('../config/generateToken');

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const { Op } = require('sequelize');

module.exports = {
    async store(req, res) {
        const { nome, usuario, email, reset } = req.body;
        // console.log(req.body)
        const resetPass = reset==='Sim'? 1 : 0;

        try {            
            
            const pass = await crypto.randomBytes(3).toString('hex');
            
            let user = await User.findOne({ where: {[Op.or]: [{ email}, {usuario }]} });
            // console.log(user)
            if (user){
                return res.json({'error': 'Email e/ou já cadastros.'})
            }

            user = await User.create({ name : nome, usuario, email, password: pass, reset_pass: resetPass });
            
            Rules.create({
                user_id: user.id,
                name: 'montagemExterna_USER'
            })

            user.password = undefined;
            
            const token = generateToken(user.id);
            
            return res.json({user, token, pass});
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
        },

    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async show(req, res) {
        const { userId } = req.params;

        try {
            
            const users = await User.findOne(
                {
                    where: {
                        id: userId
                    }
                }
            );
            
            // const password = bcrypt.

            return res.json(users);
        } catch (error) {
            return res.send(error)   
        }
            // console.log(req.params)
    },

    async destroy(req, res) {
        const { email } = req.params;

        try{
            await User.destroy({ where: { email } });
            return res.send({'msg' : 'Success delete user'});

        }catch(err){
            console.log(err);
        }
    },

    async update(req, res){
        const { userID, password } = req.body;
        // console.log(req.body)

        const resetPass = await User.update(
            {
                reset_pass: 0,
                password,
            },
            {
                individualHooks: true,
                where: {
                    id: userID
                }
            }
        )

        return res.send(resetPass)
    }
};