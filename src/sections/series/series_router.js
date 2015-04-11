/* @flow */
'use strict';

var seriesController = require('./series_controller');
var ioc = require('../../lib/ioc');
var controller = ioc.inject(seriesController);

module.exports = (function() {
    return [
        {
            method: 'GET',
            path: '/series',
            config: {
                handler: controller.get,
                bind: controller
            }
        }, {
            method: 'GET',
            path: '/series/upcoming',
            config: {
                handler: controller.upcoming,
                bind: controller
            }
        }
    ];
}());
