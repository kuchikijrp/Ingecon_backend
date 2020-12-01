const sequelize = require('sequelize');
const ApprovalMounts = require('../models/ApprovalMounts');
const User = require('../models/User');

module.exports = {
    store(req, res){
        const {idMount} = req.params;

        return res.send(idMount)
    },

    async show(req, res){
        const {idMount} = req.params;
        try {
            const approvalMounts = await ApprovalMounts.findAll(
                {
                    where: {
                        mount_id: idMount
                    }
                }
                )

                return res.send(approvalMounts);
                
            } catch (error) {
                console.log(error)
            return res.send(error)
        }

        return res.send(idMount);
    }
}