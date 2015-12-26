# Queue handler

> Queue handler for episodehunter.tv

This is part of an ongoing project to rewrite episodehunter.tv to an node.js project.
Parallel to this project, there is an ongoing project to rewrite the front end part of episodehunter [here](https://github.com/tjoskar/episodehunter.tv)

## Requirement
- Node >= 4.0
- Redis >= 3.0 ([setup](https://github.com/tjoskar/episodehunter-api))

## Install
```
$ npm run setup
```

## API
```javascript
import {connect, createJob, rpc} from 'episodehunter-queue';

// Connect
const queue = connect({ // This must happens before working with the queue
    prefix: 'eh',
    redis: {
        port: 6379,
        host: '127.0.0.1'
    }
});

// createJob
const jobName = 'something.something.dark.side';
const payload = {id: 42};
const options = {
    removeOnComplete: true, // default
    attempts: 2,
    backoff: (attempts, delay) => 42
}
createJob(jobName, payload, options);

// RPC
const job = rpc('fetch-movie', {id: 42});
job.then(movie => console.log(movie));
```
