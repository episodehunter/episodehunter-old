'use strict';

import './lib/polyfill';
import {dependencyInjection} from 'autoinject';
// import queue from './lib/queue';
import {logger} from './lib/logger';
import ShowController from './controller';
import showIngestor from './episodehunter-messages/queue/show-ingestor';

function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  } else {
    console.log('dumpError :: argument is not an object', err);
  }
}

async function addShow(job, done) {
    // logger.debug('Getting job', job.data);

    if (!job || !job.data || !job.data.ids) {
        let error = `Invalid job data: jobId: ${job.id}`;
        logger.error(error);
        done(new Error(error));
        return;
    }

    const showController: ShowController = dependencyInjection(ShowController);

    try {
        done(undefined, await showController.addNewShow(job.data.ids));
    } catch (error) {
        done(error);
    }
}

// function main() {
//     const q = queue.connect();
//     q.process(showIngestor.add, 1, addShow);
//
//     logger.info('Hello friend');
// }

if (require.main === module) {
    // main();

    addShow({
        data: {
            ids: {
                tvdbId: 82283
            }
        }
    }, (err, suc) => {
        console.log('error', dumpError(err));
        console.log('suc', suc);
    })
}

export {addShow};
