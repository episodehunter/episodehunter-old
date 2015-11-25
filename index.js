'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = exports.createLogger = undefined;

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _raven = require('raven');

var _raven2 = _interopRequireDefault(_raven);

var _bunyanRaven = require('bunyan-raven');

var _bunyanRaven2 = _interopRequireDefault(_bunyanRaven);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = undefined;

/*
Levels:
fatal (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
error (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
warn (40): A note on something that should probably be looked at by an operator eventually.
info (30): Detail on regular operation.
debug (20): Anything else, i.e. too verbose to be included in "info" level.
trace (10): Logging from external libraries used by your app or very detailed application logging.
*/
function createLogger(_ref) {
    var name = _ref.name;
    var _ref$minLevel = _ref.minLevel;
    var minLevel = _ref$minLevel === undefined ? 'warn' : _ref$minLevel;
    var filePath = _ref.filePath;
    var stdout = _ref.stdout;
    var ravenDNS = _ref.ravenDNS;

    if (!name) {
        throw new Error('You must specify an application name for the logger');
    }

    var bunyanConfig = {
        name: name,
        streams: []
    };
    var ravenClient = undefined;

    if (stdout) {
        bunyanConfig.streams.push({
            level: minLevel,
            stream: process.stdout
        });
    }

    if (filePath) {
        bunyanConfig.streams.push({
            type: 'rotating-file',
            level: minLevel,
            path: filePath,
            period: '1d',
            count: 30
        });
    }

    if (ravenDNS) {
        ravenClient = new _raven2.default.Client(ravenDNS);
        bunyanConfig.streams.push({
            type: 'raw',
            stream: new _bunyanRaven2.default(ravenClient),
            level: 'error'
        });
    }

    var bunyanLogger = _bunyan2.default.createLogger(bunyanConfig);

    if (logger === undefined) {
        exports.logger = logger = bunyanLogger;
    }

    return bunyanLogger;
}

exports.default = logger;
exports.createLogger = createLogger;
exports.logger = logger;
