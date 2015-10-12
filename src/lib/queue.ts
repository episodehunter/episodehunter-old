import {createQueue, Job} from 'kue';
import {config} from '../config';

let queue = createQueue(config.redis);

function addToQueue(jobName: string, payload: any, options: any = {}): void {
    let job = queue.create(jobName, payload);

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

export {queue, Job, addToQueue};
