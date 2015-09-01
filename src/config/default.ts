import {configInterface} from './config-interface';

const config: configInterface = {
    appName: 'episodehunter-api',
    logger: {
        level: 'info',
        filePath: '../../log/develop.txt'
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
    port: 3000,
    // hash: {
    //     salt: 'salt'
    // },
    jwt: {
        salt: 'salt'
    }
};

export {config};
