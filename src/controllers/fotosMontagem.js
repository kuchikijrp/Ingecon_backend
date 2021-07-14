const sysRules = require('../models/Rules')



module.exports = {
    async index (req, res) {
        const testFolder = 'C:\\Users\\juliano.piris\\Desktop\\www\\Ingecon\\Ingecon_frontend\\public\\fotos';
        const fs = require('fs');

        let fotos = []

        fs.readdirSync(testFolder).forEach(file => {
            fotos.push(file);
          });

        return res.send(fotos)
    },
}