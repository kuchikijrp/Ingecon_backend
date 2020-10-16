const MenuArvore = require('../models/MenuArvore');

module.exports = {
    async index(req, res){

        const menu = await MenuArvore.findAll();

        return res.send(menu);

    }
}