const MenuArvore = require('../models/MenuArvore');

module.exports = {
    async index(req, res){
    },

    async store(req, res){
        const {name, parent} = req.body;
        // console.log(req.body)

        const itemMenu = await MenuArvore.create({
            name,
            parent
        });

        return res.send(itemMenu);
    }
}