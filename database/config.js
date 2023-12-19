const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {  
        trustServerCertificate: false,
        enableArithAbort : true,  
        encrypt: false
    }
}

const conexion = async () => {
    try {
       await sql.connect(config);
    } catch (err) {
       throw err;
    }
}

module.exports = {conexion, config}