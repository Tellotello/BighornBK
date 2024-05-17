const config = {
    user: process.env.DB_USER || "sheepadmin",
    password: process.env.DB_PASSWORD || "Tecdemonterrey1!",
    server: process.env.DB_SERVER || "bighorn.database.windows.net",
    database: process.env.DB_NAME || "bighorn-db",
    options: {
        encrypt: true, 
        enableArithAbort: true
    }
};

module.exports = config;
