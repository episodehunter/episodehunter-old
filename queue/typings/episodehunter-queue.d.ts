interface jobOptions {
    removeOnComplete?: boolean;
    attempts?: number;
    backoff?: any;
}

interface redisConfig {
    prefix: string;
    redis: {
        port: number;
        host: string;
    };
}

declare module 'episodehunter-queue' {
    function connect(config: redisConfig): any;
    function addToQueue<T>(jobName: string, payload: T, options?: jobOptions): void;
    function addToQueue(jobName: string, payload: any, options?: jobOptions): void;
    function rpc<T>(jobName: string, payload: any, options?: any): Promise<T>;
    export default { connect, addToQueue, rpc };
    export { connect, addToQueue, rpc };
}
