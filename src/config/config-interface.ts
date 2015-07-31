interface configInterface {
    db: {
        client: string;
        connection: {
            host: string;
            user: string;
            password: string;
            database: string;
        };
        debug: boolean;
    };
    port: number;
};

export {configInterface};
