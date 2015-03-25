var ioc = require('./../../src/lib/ioc');

var db = require('./../../src/lib/db');

ioc.register('lib.db', db);
