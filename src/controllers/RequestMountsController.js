const mailer = require('../modules/mailer');

const RequestMount = require('../models/RequestMounts');
const { decode } = require('jsonwebtoken');

module.exports = {
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

    async store(req, res){
        const {type, id_at, client, store, contact_store, type_work, start_work, end_work, qtd_fitters, budgeted, time_discharge, time_work, obs} = req.body;
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
                    client,
                    store,
                    type_work,
                    start_work,
                    end_work,
                    qtd_fitters,
                    budgeted,
                    time_discharge,
                    time_work,
                    obs
                });
                
                await mailer.sendMail({
                    to: 'juliano.piris@ingecon.com.br',
                    from: 'sistema@ingecon.com.br',
                    subject:`Solicitação Montagem - ${mount.id}`,
                    template: 'solicitacaoMontagemEnviada',
                }, (err) => {
                    if(err)
                        return console.log(err);
                })

                return res.send(mount);

            }catch(err){
                return res.send(err)
            }
    }
}