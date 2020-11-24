module.exports = {
    dialect: 'mssql',
    host: "140.0.0.189",
    port: '65465',
    username: 'apiIngecon',
    password: 'apiIngecon',
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