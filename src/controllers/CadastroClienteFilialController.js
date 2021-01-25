const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const cadastroClienteFilial = require('../models/CadastroClienteFilial');
const Op = Sequelize.Op;

module.exports = {
    async show (req, res){
        const { id } = req.params;

        try {
            const filial = await cadastroClienteFilial.findOne({
                where:{
                    nm_desc_filial : id
                }
            })

            if (filial)
                return res.send(filial)
            else
                return res.send({'msg' : 'Cliente não encontrado'});
        } catch (error) {
            return res.send(error)
        }
    },

    async index(req, res){
        try {
            const filiais = await cadastroClienteFilial.findAll({
                where: {
                    id_cliente: {[Op.notIn] : [99999, 99991]}
                }
            })
            // console.log(filiais)
            if (filiais)
                return res.send(filiais)
            else
                return res.send({'msg' : 'Cliente não encontrado'});
        } catch (error) {
            // console.log(error)
            return res.send(error)
        }
    }
}