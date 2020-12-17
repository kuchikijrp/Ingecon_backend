const emailConfig = require('../config/email.json');
const {resolve} = require('path');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: true,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password
    } 
});

const viewPath = resolve(__dirname, '..', 'modules', 'mailTemplate')

transport.use('compile', hbs({
    viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'montagemExterna'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'solicitacaoMontagemEnviada',
        extname: '.handlebars',
    }),
    viewPath,
    extname: '.handlebars'
}));

module.exports = transport;