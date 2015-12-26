'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__kue = exports.rpc = exports.addToQueue = exports.connect = undefined;

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queue = undefined;
var __kue = _kue2.default;

function connect(config) {
    if (queue === undefined) {
        queue = _kue2.default.createQueue(config);
    }
    return queue;
}

function createJob(jobName, payload) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (queue === undefined) {
        throw new Error('There is no connection to the redis, connect first');
    }

    var job = queue.create(jobName, payload);

    if (options.removeOnComplete !== false) {
        job.removeOnComplete(true);
    }

    if (options.attempts) {
        job.attempts(options.attempts);
    }

    if (options.backoff) {
        job.backoff(options.backoff);
    }

    return job;
}

function addToQueue(jobName, payload) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var job = createJob(jobName, payload, options);
    job.save();
}

function rpc(jobName, payload) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var job = createJob(jobName, payload, options);

    return new Promise(function (resolve, reject) {
        job.on('complete', function (result) {
            return resolve(result);
        });
        job.on('failed', function (error) {
            return reject(error);
        });
        job.save();
    });
}

exports.default = { connect: connect, addToQueue: addToQueue, rpc: rpc, __kue: __kue };
exports.connect = connect;
exports.addToQueue = addToQueue;
exports.rpc = rpc;
exports.__kue = __kue;
