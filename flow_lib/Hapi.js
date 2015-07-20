declare class hapiServer {
    info: {
        uri: string
    };

    auth: {
        strategy: Function
    };

    connection(settings: Object): void;
    start(callback: Function): void;
    route(r: any): void;
    register(reg: Object, callback: Function) : void;

}

declare module hapi {
    declare class Server extends hapiServer {}
}
