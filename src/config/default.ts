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
        debug: true
    },
    port: 3000,
    hash: {
        salt: 'salt'
    },
    jwt: {
        salt: 'salt'
    }
};

export {config};
