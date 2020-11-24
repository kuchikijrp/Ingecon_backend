const mailer = require('../modules/mailer');

const RequestMount = require('../models/RequestMounts');
const { decode } = require('jsonwebtoken');
const { update } = require('../models/RequestMounts');

module.exports = {
    async show(req, res){
        const {idMount} = req.params;
        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        const userid = payload.sub;
        
        try{
            const mount = await RequestMount.findByPk(idMount)

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
            const mountsrequest = await RequestMount.findAll({
                where: {
                  user_id: userid
                }
              });
            
            return res.send(mountsrequest);
        }catch(err){
            // console.log(err)
            return res.send(err)
        }

    },

    async update(req, res){
        const {idMount, status} = req.body;
        // console.log(req.body);

        const authHeader = req.headers.authorization || "";
        const [ , token] = authHeader.split(" ");
        const payload = decode(token);

        const userid = payload.sub;

        try {
            const mount = await RequestMount.update({status},
                {
                    where: {
                        id: idMount
                    }
                });

                    await mailer.sendMail({
                        to: 'juliano.piris@ingecon.com.br',
                        // cc: emailUser,
                        from: 'sistema@ingecon.com.br',
                        subject:`Solicitação Montagem - ${idMount} - ${status}`,
                        template: 'solicitacaoMontagemEnviada',
                    })
                
                return res.send({"msg": "Solicitação salva com sucesso"})

        } catch (err) {
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
                    subject:`Solicitação Montagem - ${mount.id}`,
                    template: 'solicitacaoMontagemEnviada',
                }, (err) => {
                    if(err)
                        return console.log(err);
                })

                // console.log(mount)
                return res.send(mount);

            }catch(err){
                return res.send(err)
            }
    }
}