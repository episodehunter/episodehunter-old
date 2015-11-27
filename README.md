## Queue handler for Episodehunter

This is a simple queue handler for the Episode Hunter project. 

### Methods

#### API
```javascript
import {connect, addToQueue, rpc} from 'episodehunter-queue';

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
    attempts: 2
}
createJob(jobName, payload, options);

// RPC
const job = rpc('fetch-movie', {id: 42});
job.then(movie => console.log(movie));
```
