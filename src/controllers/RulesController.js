const sysRules = require('../models/Rules')

module.exports = {
    async store (req, res) {
        const {name, user_id} = req.body;
        try {
            const rule = await sysRules.create({name, user_id});

            return res.send(rule)
        } catch (error) {
            return res.send(error);
        }
    },

    async delete (req, res){
        const {id} = req.params;

        console.log(id)
        try {
            await sysRules.delete({ where: {id}})

            return res.send();
        } catch (error) {
            return res.send(error)
        }
    }
}