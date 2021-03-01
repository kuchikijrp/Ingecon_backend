const { request } = require('express');
const { decode } = require('jsonwebtoken');

const { Op } = require('sequelize');

const Rules = require('../models/Rules')
const ManutencaoInterna = require('../models/ManutencaoInterna');
const User = require('../models/User');

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
                descricao_problema: descricaoProblema,
                status: 'aguardando'
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
                const ManutencaoInternaADM = await Rules.findOne({
                    where:{
                        [Op.and]:[
                            {user_id: user_id},
                            {name: 'manutencaoInterna_ADM'}
                        ]
                    }
                })

                const manutencoes = !ManutencaoInternaADM? 
                await ManutencaoInterna.findAll(
                    {
                        where:{
                            [Op.or]:[
                                { user_id: user_id },
                                { id_tecnico: user_id }
                            ]
                        },
                        include: ['manutencoesToUser', 'manutencoesToTecnico']
                    })
                :
                    await ManutencaoInterna.findAll(
                    {
                        include: ['manutencoesToUser', 'manutencoesToTecnico']
                    })

            
            
            return res.send(manutencoes)
        } catch (error) {
            console.log(error.original)
            return res.send({'Erro': 'Erro ao buscar Solicitações'})
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
        const { parecerTecnico, status, tecnico, dtIni, dtFim } = req.body;
        const { id } = req.params;

        let user = null
        if (tecnico !== 'Terceiro'){
                user = await User.findOne({
                where: {
                    name: tecnico
                }
            }) 
            if (!user){
                return res.send({'Erro': 'Técnico não encontrado'})
            }
        }
        try {
            if (user !== null){
                await ManutencaoInterna.update({
                    id_tecnico: user.dataValues.id,
                    tipo_atendimento: 'Interno'
                },
                {
                    where: {
                        id
                    }
                })
                
            }else{
                    await ManutencaoInterna.update({
                        id_tecnico: null,
                        tipo_atendimento: 'Terceiro'
                    },
                    {
                        where: {
                            id
                        }
                    })                    
                }
            

                if(status === 'iniciado'){
                    await ManutencaoInterna.update({
                        inicio_atendimento: dtIni? dtIni : new Date,
                        parecer_tecnico: parecerTecnico,
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
                        fim_atendimento: dtFim? dtFim : new Date,
                        parecer_tecnico: parecerTecnico,
                        status
                    },
                    {
                        where: {
                            id
                        }
                    })
                }
                if(status === 'reprovado'){
                    await ManutencaoInterna.update({
                        // fim_atendimento: dtFim? dtFim : new Date,
                        parecer_tecnico: parecerTecnico,
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