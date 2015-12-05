const config = {
    appName: 'episodehunter-scrobbler',
    logger: {
        level: 'debug',
        filePath: `../../log/episodehunter-scrobbler.txt`,
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
    }
};

export {config};
