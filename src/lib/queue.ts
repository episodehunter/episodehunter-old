import {createQueue, Job} from 'kue';
import {config} from '../config';

let queue = createQueue(config.redis);

export {queue, Job};
