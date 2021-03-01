const sequelize = require('sequelize');

const Funcionarios = require('../models/RhFuncionarios');

module.exports = {
    async show(req, res){
        const { lotacao } = req.params;
        try {
            const rhFuncionarios = await Funcionarios.findAll(
                {
                    where: {
                        nm_lotacao: lotacao
                    }
                }
                )

            return res.json({rhFuncionarios, terceiro:[{'id': 9999, 'name': 'TERCEIRO'}]});
                
            } catch (error) {
                console.log(error)
            return res.send(error)
        }
    }
}