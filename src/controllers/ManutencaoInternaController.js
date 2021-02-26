const { decode } = require('jsonwebtoken');

const { Op } = require('sequelize');

const ManutencaoInterna = require('../models/ManutencaoInterna');

module.exports = {
    async store(req, res){
        const {tituloProblema, localProblema, equipamento, situacaoEquipamento, tipoManutencao, tipoServico, descricaoProblema} = req.body;

        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        const user_id = payload.sub;
        try {
            const manutencao = await ManutencaoInterna.create({
                user_id,
                titulo_problema: tituloProblema,
                local_ocorrencia: localProblema,
                equipamento,
                situacao_equipamento: situacaoEquipamento,
                tipo_manutencao: tipoManutencao,
                tipo_servico: tipoServico,
                descricao_problema: descricaoProblema
            })

            return res.send(manutencao)
        } catch (error) {
            return res.send(error)
        }
    },

    async index(req, res){
        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        const user_id = payload.sub;

        try {
            const manutencoes = await ManutencaoInterna.findAll(
                {
                    where:{
                        [Op.or]:[
                            { user_id: user_id },
                            { id_tecnico: user_id }
                        ]
                    },
                    include: ['manutencoesToUser', 'manutencoesToTecnico']
                })
            
            return res.send(manutencoes)
        } catch (error) {
            console.log(error)
        }
    },

    async show(req, res){
        const {id} = req.params;

        try {
            const manutencao = await ManutencaoInterna.findByPk(id, {include: ['manutencoesToUser', 'manutencoesToTecnico']})
            
            return res.send(manutencao)
        } catch (error) {
            console.log(error)
        }
    },

    async update(req, res){
        const { parecer_tecnico, status } = req.body;
        const { id } = req.params;

            try {
            
                if(status === 'iniciado'){
                    await ManutencaoInterna.update({
                        inicio_atendimento: new Date,
                        parecer_tecnico,
                        status
                    },
                    {
                        where: {
                            id
                        }
                    })
                }
                if(status === 'finalizado'){
                    await ManutencaoInterna.update({
                        fim_atendimento: new Date,
                        parecer_tecnico,
                        status
                    },
                    {
                        where: {
                            id
                        }
                    })
                }
    
            return res.send({"msg": "Serviço atualizado"})
            
        } catch (error) {
            console.log(error)
        }
    }
}