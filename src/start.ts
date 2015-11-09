import {dependencyInjection} from 'autoinject';
import queue from './lib/queue';
import {logger} from './lib/logger';
import ShowController from './add-new-show/new-show.controller';
import showIngestor from './episodehunter-messages/queue/show-ingestor';

const q = queue.connect();

q.process(showIngestor.add, 1, (job, done) => {
    logger.debug('Getting job', job.data);
    if (!job || !job.data || !job.data.ids) {
        let error = `Invalid job data: jobId: ${job.id}`;
        logger.error(error);
        done(new Error(error));
        return;
    }

    const showController: ShowController = dependencyInjection(ShowController);

    try {
        showController.addNewShow(job.data.ids);
        done();
    } catch (error) {
        done(error);
    }
});

logger.info('Hello friend');
