import {configInterface} from './config-interface';

const config: configInterface = {
    "db": {
        "client": "mysql",
        "connection": {
            "host": "192.168.56.101",
            "user": "episodehunter",
            "password": "episodehunter",
            "database": "episodehunter"
        },
        "debug": true
    },
    port: 3000
};

export {config};
