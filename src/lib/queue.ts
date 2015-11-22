import {Queue, createQueue, Job} from 'kue';
import {config} from '../config/index';

let queue: Queue = undefined;

function connect() {
    if (queue === undefined) {
        queue = createQueue(config.redis);
    }
    return queue;
}

function createJob(jobName: string, payload: any, options: any = {}): Job {
    if (queue === undefined) {
        connect();
    }

    const job = queue.create(jobName, payload);

    if (options.removeOnComplete !== false) {
        job.removeOnComplete(true);
    }

    if (options.attempts) {
        job.attempts(options.attempts);
    }

    if (options.backoff) {
        job.backoff(options.backoff);
    }

    return job;
}

function addToQueue(jobName: string, payload: any, options: any = {}): void  {
    const job = createJob(jobName, payload, options);
    job.save();
}

function rpc<T>(jobName: string, payload: any, options: any = {}): Promise<T> {
    const job = createJob(jobName, payload, options);

    return new Promise<T>((resolve, reject) => {
        job.on('complete', result => resolve(result));
        job.on('failed', error => reject(error));
        job.save();
    });
}

export default {connect, addToQueue, rpc};
export {connect, addToQueue, rpc};
