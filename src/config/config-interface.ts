interface configInterface {
    appName: string;
    logger: {
        level: string;
        filePath: string;
        ravenDns: string;
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
    redis: {
        prefix: string;
        redis: {
            port: number;
            host: string;
        }
    };
    port: number;
    // hash: {
    //     salt: string;
    // };
    jwt: {
        salt: string;
    };
};

export {configInterface};
