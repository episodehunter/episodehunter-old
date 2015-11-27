interface jobOptions {
    removeOnComplete: boolean;
    attempts: number;
    backoff: any;
}

declare module 'episodehunter-queue' {
    function connect(): any;
    function addToQueue<T>(jobName: string, payload: T, options?: jobOptions): void;
    function addToQueue(jobName: string, payload: any, options?: jobOptions): void;
    function rpc<T>(jobName: string, payload: any, options?: any): T;
    export default { connect, addToQueue, rpc };
    export { connect, addToQueue, rpc };
}
