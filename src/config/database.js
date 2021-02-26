require('dotenv').config({
    path: (process.env.NODE_ENV || '').trim() === 'dev' ? '.env.dev' : '.env'
});


module.exports = {
    dialect: 'mssql',
    host: "140.0.0.189",
    port: '65465',
    username: 'sa',
    password: 'BD_Com2020',
    // database: process.env.DB_NAME,
    database: 'BD_Comercial_dev',
    // timezone: 'utc',
    timezone: '-03:00',
    define: {
        timestamps: true,
        underscored: true
    },
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    }
};