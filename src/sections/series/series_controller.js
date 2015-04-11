/* @flow */
'use strict';

var service = require('./series_service');

class Series {

    service: SeriesService;

    constructor(_service: SeriesService) {
        this.service = _service;
    }

    get(request: Object, reply: Function) {
        console.log('Okej, using: ' + request.headers.authorization);
        reply({'hej': 'hej'}).type('application/json');
    }

    upcoming(request: Object, reply: Function) {
        var userId = 2;
        this.service.upcoming(userId)
            .then(data => {
                reply(data);
            });
    }

}

Series.inject = [service];
module.exports = Series;
