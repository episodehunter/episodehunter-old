import {createQueue, Job} from 'kue';
import {config} from '../config';

const queue = createQueue(config.redis);

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

export default {connect, Job, addToQueue};
export {connect, Job, addToQueue};
