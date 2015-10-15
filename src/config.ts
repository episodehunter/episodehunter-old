const config = {
    appName: 'episodehunter-show-handler',
    logger: {
        level: 'debug',
        filePath: `../../log/episodehunter-show-handler.txt`
    },
    db: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'episodehunter',
            password: 'episodehunter',
            database: 'episodehunter',
            port: 33060
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
    tvdbAPIkey: ''
}

export {config};
