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

export function connect(config: redisConfig): any;
export function addToQueue<T>(jobName: string, payload: T, options?: jobOptions): void;
export function addToQueue(jobName: string, payload: any, options?: jobOptions): void;
export function rpc<T>(jobName: string, payload: any, options?: any): Promise<T>;
export default { connect, addToQueue, rpc };
