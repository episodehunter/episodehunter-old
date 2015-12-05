'use strict';

import './lib/polyfill';
import queue from 'episodehunter-queue';
import {dependencyInjection} from 'autoinject';
import {logger} from './lib/logger';
import confg from './config';
import ShowController from './controller';
import showIngest from './episodehunter-messages/queue/show-ingestor';

function addShow(job): Promise<any> {
    if (!job || !job.data || !job.data.ids) {
        return Promise.reject(`Invalid job data: jobId: ${job.id}`);
    }

    const showController: ShowController = dependencyInjection(ShowController);
    return showController.addNewShow(job.data.ids);
}

function updateShow(job): Promise<number|string> {
    if (!job || !job.data || !job.data.ids) {
        return Promise.reject<string>(`Invalid job data: jobId: ${job.id}`);
    }

    const showController: ShowController = dependencyInjection(ShowController);
    return showController.updateShow(job.data.ids);
}

function processJob(fun) {
    return (job, done) => {
        logger.debug('Getting job', job.data);

        fun(job)
            .then(result => {
                done(undefined, result);
            })
            .catch(error => {
                logger.fatal(error);
                done(error);
            });
    };
}

function main() {
    const q = queue.connect(confg.redis);
    q.process(showIngest.add, 1, processJob(addShow));

    logger.info('Hello friend');
}

if (require.main === module) {
    main();
}

export {addShow, updateShow};
