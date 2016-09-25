if (process.argv.indexOf('--dev') >= 0) {
    process.env.NODE_ENV = 'dev';
    process.env.EH_DB_HOST = 'localhost';
    process.env.EH_DB_USER = 'episodehunter';
    process.env.EH_DB_PASS = 'episodehunter';
    process.env.EH_DB_DB = 'episodehunter';
    process.env.EH_DB_PORT = '33060';
    process.env.EH_API_SERVER_PORT = 8000;
    process.env.EH_JWT_SALT = 'RANDOM-DEV-STRING:2y0!tAjB390E-a';
}

const config = {
    appName: 'episodehunter-api',
    logger: {
        level: process.env.EH_LOG_LEVEL || 'debug',
        filePath: '../../log/episodehunter-api.txt',
        ravenDns: process.env.RAVEN_DNS
    },
    db: {
        client: 'mysql',
        connection: {
            host: process.env.EH_DB_HOST,
            user: process.env.EH_DB_USER,
            password: process.env.EH_DB_PASS,
            database: process.env.EH_DB_DB,
            port: process.env.EH_DB_PORT
        },
        debug: false
    },
    redis: {
        prefix: 'eh',
        redis: {
            port: 6379,
            host: '127.0.0.1'
        }
    },
    port: process.env.EH_API_SERVER_PORT,
    jwt: {
        salt: process.env.EH_JWT_SALT
    }
};

export { config };
export default config;
