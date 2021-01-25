const FormPagto = require('../models/FormaPagamento');

module.exports = {
    async index(req, res){
        try {
            const formPagto = await FormPagto.findAll({
                order: [
                    ['NM_DESC_CONDICAO_PAGTO', 'ASC'],
                ]
            });

            return res.send(formPagto)
        } catch (error) {
            console.log(error)
            // return res.send({'error': error})
        }
    },
}