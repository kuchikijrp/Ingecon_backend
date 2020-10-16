module.exports = {
    dialect: 'mssql',
    host: "pc79",
    port: '65465',
    username: 'sa',
    password: 'BD_Com2020',
    database: 'BD_Comercial_dev',
    // database: 'BD_Comercial',
    timezone: 'utc',
    define: {
        timestamps: true,
        underscored: true
    },
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    }
};