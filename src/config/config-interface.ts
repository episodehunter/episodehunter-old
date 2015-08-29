interface configInterface {
    appName: string;
    logger: {
        level: string;
        filePath: string;
    };
    db: {
        client: string;
        connection: {
            host: string;
            user: string;
            password: string;
            database: string;
            port: number;
        };
        debug: boolean;
    };
    port: number;
    hash: {
        salt: string;
    };
    jwt: {
        salt: string;
    };
};

export {configInterface};
