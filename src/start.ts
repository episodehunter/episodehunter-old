import {queue, Job} from './lib/queue';
import {logger} from './lib/logger';

queue.process('somename', 1, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    if (!job || !job.data || !job.data.userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    someController.doWork(job.data.show, job.data.userId)
        .then(data => done(undefined, data))
        .catch(error => done(error));
});

logger.info('Hello friend');
