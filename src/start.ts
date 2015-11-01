import {dependencyInjection} from 'autoinject';
import {queue, Job} from './lib/queue';
import {logger} from './lib/logger';
import ShowController from './add-new-show/new-show.controller';
import showIngestor from './episodehunter-messages/queue/show-ingestor';

queue.process(showIngestor.add, 1, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    if (!job || !job.data || !job.data.ids) {
        let error = `Invalid job data: jobId: ${job.id}`;
        logger.error(error);
        done(new Error(error));
        return;
    }

    const showController = dependencyInjection<ShowController>(ShowController);

    showController.addNewShow(job.data.ids)
        .then(data => done(undefined, data))
        .catch(error => done(error));
});

logger.info('Hello friend');
