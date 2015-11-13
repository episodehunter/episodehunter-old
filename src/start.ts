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

function addShow(job): Promise<any> {
    if (!job || !job.data || !job.data.ids) {
        return Promise.reject(`Invalid job data: jobId: ${job.id}`);
    }

    const showController: ShowController = dependencyInjection(ShowController);
    return showController.addNewShow(job.data.ids);
}

function processJob(fun, job, done) {
    logger.debug('Getting job', job.data);

    fun(job)
        .then(result => {
            done(undefined, result);
        })
        .catch(err => {
            done(err)
        });
}

// function main() {
//     const q = queue.connect();
//     q.process(showIngestor.add, 1, addShow);
//
//     logger.info('Hello friend');
// }

if (require.main === module) {
    // main();

    processJob(addShow, {
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
