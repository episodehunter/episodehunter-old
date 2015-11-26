var kue = require('kue');

var config = {
    prefix: 'eh',
    redis: {
        port: 6379,
        host: '127.0.0.1'
    }
};

kue.createQueue(config);
kue.app.listen(3000);
