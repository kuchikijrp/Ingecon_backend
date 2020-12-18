const mailer = require('../modules/mailer');

const RequestMount = require('../models/RequestMounts');
const ApprovalMount = require('../models/ApprovalMounts');
const User = require('../models/User');
const sysRules = require('../models/Rules');

const { decode } = require('jsonwebtoken');

module.exports = {
    async show(req, res){
        const {idMount} = req.params;
        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        const userid = payload.sub;
        
        try{
            const mount = await RequestMount.findByPk(idMount, {include: ['mountsToUser']})

            // console.log(mount)
            if (mount){
                return res.send(mount)
            }else{
                return res.send({"error": "Solicitação não encontrada"})
            }
        }catch(err){
            return res.send(err);
        }
    },

    async index(req, res){
        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        const userid = payload.sub;

        try{
            const rule = await sysRules.findOne({where : {user_id : userid, name: 'montagemExterna_ADM'}});
            // console.log(rule);


            const mountsrequest = rule ? await RequestMount.findAll({include: ['mountsToUser']}) : await RequestMount.findAll({where: {user_id: userid}})
            

            // console.log(mountsrequest)
            return res.send(mountsrequest);
        }catch(err){
            console.log(err)
            return res.send(err)
        }

    },

    async update(req, res){
        const {idMount, status, obs, obsTotal, emailUser, emailDonoMont, alimentacao, material, deslocamento, combustivel, passagem, hospedagem, terceiros, outros, despesas} = req.body;
        // console.log(req.body);

        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        let email = ''

        const userid = payload.sub;

        try {
            let mount = await RequestMount.findOne({where: {id: idMount}})
                if (mount.dataValues.status === status){
                    email = false
                }else{
                    email = true
                }
                // console.log(email)
            await RequestMount.update({
                status,
                vl_alimentacao: alimentacao,
                vl_material: material,
                vl_deslocamento: deslocamento,
                vl_combustivel: combustivel,
                vl_passagem: passagem,
                vl_hospedagem: hospedagem,
                vl_terceiros: terceiros,
                vl_outros: outros,
                vl_desp_total: despesas
                },
                {
                    where: {
                        id: idMount
                    }
                });

            mount = await RequestMount.findOne({where: {id: idMount}})
            // console.log(mount.dataValues);

            const user = await User.findOne({id : userid});
            // console.log(user.dataValues.usuario);
                
            const approvalMount = await ApprovalMount.create({
                user_id: userid,
                user_name: user.dataValues.usuario,
                mount_id: idMount,
                status,
                obs
            });

            if (email){
                await mailer.sendMail({
                    to: emailDonoMont,
                    cc: emailUser,
                    from: 'sistema@ingecon.com.br',
                    subject:`Solicitação Montagem - ${mount.dataValues.type} ${idMount} - ${status}`,
                    template: 'solicitacaoMontagemEnviada',
                    context: {
                        msg : 'Houve atualização em sua solicitação.',
                        loja: mount.dataValues.store,
                        tipoSolicitacao: mount.dataValues.type,
                        idSolicitacao: mount.dataValues.id,
                        tipoLoja: mount.dataValues.type_work,
                        inicio: new Date(mount.dataValues.start_work).toLocaleDateString('en-GB', {timeZone : 'UTC'}),
                        fim: new Date(mount.dataValues.end_work).toLocaleDateString('en-GB', {timeZone : 'UTC'}),
                        orcamento: mount.dataValues.budgeted.toLocaleString(),
                        status : mount.dataValues.status,
                        obs: obsTotal
                    }
                }, (err) => {
                    if(err)
                        return console.log(err);
                })
            }
                
            return res.send({"msg": "Solicitação salva com sucesso"})

        } catch (err) {
            console.log(err)
            return res.send(err)
        }
    },

    async store(req, res){
        const {type, id_at, client, store, contact_store, contact_phone, type_work, start_work, end_work, qtd_fitters, budgeted, time_discharge, time_work, obs, emailUser} = req.body;
       
        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        const userid = payload.sub;
        // console.log(userid);
            try{
                const mount = await RequestMount.create({
                    user_id: userid,
                    id_at,
                    type,
                    contact_store,
                    contact_phone,
                    client,
                    store,
                    type_work,
                    start_work,
                    end_work,
                    qtd_fitters,
                    budgeted,
                    time_discharge,
                    time_work,
                    obs,
                    status: 'Em Analise'
                });
                
                await mailer.sendMail({
                    to: 'juliano.piris@ingecon.com.br',
                    cc: emailUser,
                    from: 'sistema@ingecon.com.br',
                    subject:`Solicitação Montagem - ${mount.type} ${mount.id} - ${mount.status}`,
                    template: 'solicitacaoMontagemEnviada',                    
                    context: {
                        msg : 'Nova solicitação aberta com sucesso! Aguarde retorno da equipe da montagem externa.',
                        loja: mount.store,
                        tipoSolicitacao: mount.type,
                        idSolicitacao: mount.id,
                        tipoLoja: mount.type_work,
                        inicio: new Date(mount.start_work).toLocaleDateString('en-GB', {timeZone : 'UTC'}),
                        fim: new Date(mount.end_work).toLocaleDateString('en-GB', {timeZone : 'UTC'}),
                        orcamento: mount.budgeted.toLocaleString(),
                        status : mount.status,
                        obs: obs
                    }
                }, (err) => {
                    if(err)
                        return console.log(err);
                })

                // console.log(mount)
                return res.send(mount);

            }catch(err){
                console.log(err);
                return res.send(err)
            }
    }
}