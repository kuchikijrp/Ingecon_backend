const Feature = require('../models/Feature');

module.exports = {
    async index(req, res){
        try {
            const features = await Feature.findAll()

            return res.send(features)
        } catch (error) {
            return res.send(error)
        }
    },

    async delete(req, res){
        const { id } = req.params;
        try {
            await Feature.destroy({
                where: {
                    id
                }
            })

            return res.send()
        } catch (error) {
            return res.send(error)
        }
    },

    async store(req, res){
        const { name } = req.body;
        // console.log(req.body)

        try {
            const feature = await Feature.create({
                name,
            });
            
            return res.send(feature);
        } catch (error) {
            return res.send(error)
        }

    }
}