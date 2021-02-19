module.exports = {
    dialect: 'mssql',
    host: "140.0.0.189",
    port: '65465',
    username: 'apiIngecon',
    password: 'apiIngecon',
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