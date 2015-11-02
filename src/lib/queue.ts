import {Queue, createQueue} from 'kue';
import {config} from '../config';

let queue: Queue = undefined;

function connect() {
    if (queue === undefined) {
        queue = createQueue(config.redis);
    }
    return queue;
}

function addToQueue(jobName: string, payload: any, options: any = {}): void {
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

    job.save();
}

export default {connect, addToQueue};
export {connect, addToQueue};
