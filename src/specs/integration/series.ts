let lab = require('lab').script();
let code = require('code');
import {mockDb, headers, loginIfTrying} from './helper-functions';
import {server} from '../../server';

let tracker = mockDb();
tracker.install();

lab.test(`Should return 404 for a series that doesn't exist`, done => {
    let options = {
        method: 'GET',
        url: '/series/1',
        headers: headers
    };

    tracker.on('query', query => {
        if (loginIfTrying(query)) return;
        query.response(undefined);
    });

    server.inject(options, response => {
        let result = response.result;

        code.expect(response.statusCode).to.equal(404);
        code.expect(result).to.deep.equal({ statusCode: 404, error: 'Not Found' });

        done();
    });
});

lab.test(`Should return a tv show when asking for it`, done => {
    let options = {
        method: 'GET',
        url: '/series/3860',
        headers: headers
    };

    let dbRow = {
        id: 3860,
        tvdbId: '289590',
        imdbId: 'tt4158110',
        title: 'Mr. Robot',
        dayOfWeek: 'Wednesday',
        time: '10:00 PM',
        first: '2015-06-24',
        genre: '|Drama|',
        language: 'en',
        network: 'USA Network',
        overview: 'A contemporary and culturally resonant drama about a young programmer',
        runtime: 60,
        status: 'Continuing',
        fanart: '556781d25eb23.jpg',
        poster: '556781d26549e.jpg'
    };

    tracker.on('query', query => {
        if (loginIfTrying(query)) return;
        query.response(dbRow);
    });

    server.inject(options, response => {
        let result = response.result;

        code.expect(response.statusCode).to.equal(200);
        code.expect(result).to.deep.equal({
            series: {
                ids: {
                    id: dbRow.id
                },
                title: dbRow.title,
                year: 0,
                airs: {
                    dayOfWeek: dbRow.dayOfWeek,
                    time: dbRow.time,
                    first: dbRow.first
                },
                genre: ['Drama'],
                language: dbRow.language,
                network: dbRow.network,
                overview: dbRow.overview,
                runtime: dbRow.runtime,
                status: dbRow.status,
                fanart: dbRow.fanart,
                poster: dbRow.poster
            }
        });

        done();
    });
});

export {lab};
