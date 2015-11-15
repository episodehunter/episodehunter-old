'use strict';

const config = {
    appName: 'episodehunter-image-ingest',
    logger: {
        level: 'debug',
        filePath: `../../log/episodehunter-image-ingest.txt`
    },
    db: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'episodehunter',
            password: 'episodehunter',
            database: 'episodehunter',
            port: 33060
        },
        debug: false
    },
    redis: {
        prefix: 'eh',
        redis: {
            port: 6379,
            host: '127.0.0.1'
        }
    },
    image: {
        tvdb: {
            imageBaseUrl: 'http://thetvdb.com/banners/'
        },
        moviedb: {
            apiKey: ''
        },
        savePath: {
            show: {
                fanart: './tmp-folder/show/fanart/',
                poster: './tmp-folder/show/poster/',
                episode: './tmp-folder/show/episode/'
            },
            movie: {
                fanart: './tmp-folder/movie/fanart/',
                poster: './tmp-folder/movie/poster/',
            }
        }
    }
};

export default config;
export {config};
