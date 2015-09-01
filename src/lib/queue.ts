import {createQueue} from 'kue';
import {config} from '../config/index';
import {jobNames} from './constant/queue-jobs';

const queue = createQueue(config.redis);

export {queue, jobNames};
