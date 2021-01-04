const MenuArvore = require('../models/MenuArvore');

module.exports = {
    async index(req, res){

        const menu = await MenuArvore.findAll({
            where:{
                menu: 1
            }
        });

        return res.send(menu);

    }
}