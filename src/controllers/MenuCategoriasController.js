const MenuArvore = require('../models/MenuArvore');

module.exports = {
    async index(req, res){
    },


    async delete(req, res){
        const { id } = req.params

        try {
            await MenuArvore.destroy({
                where:{
                    id
                }
            });

            return res.send()
        } catch (error) {
            return res.send(error)
        }
    },

    async store(req, res){
        const {name, parent, status, menu, route} = req.body;
        // console.log(req.body)
        try {
            const itemMenu = await MenuArvore.create({
                name,
                parent,
                route,
                status, 
                menu
            });
    
            return res.send(itemMenu);
            
        } catch (error) {
            return res.send(error)
        }
    }
}