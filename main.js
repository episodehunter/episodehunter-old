'use strict';

import {createQueue} from 'kue';

let queue = undefined;

function connect(config) {
    if (queue === undefined) {
        queue = createQueue(config);
    }
    return queue;
}

function createJob(jobName, payload, options = {}) {
    if (queue === undefined) {
        throw new Error('There is no connection to the redis, connect first');
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

function addToQueue(jobName, payload, options = {}): void  {
    const job = createJob(jobName, payload, options);
    job.save();
}

function rpc(jobName, payload, options = {}) {
    const job = createJob(jobName, payload, options);

    return new Promise((resolve, reject) => {
        job.on('complete', result => resolve(result));
        job.on('failed', error => reject(error));
        job.save();
    });
}

export default {connect, addToQueue, rpc};
export {connect, addToQueue, rpc};
