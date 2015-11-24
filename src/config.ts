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
            host: process.env.EH_DB_HOST,
            user: process.env.EH_DB_USER,
            password: process.env.EH_DB_PASS,
            database: process.env.EH_DB_DB,
            port: process.env.EH_DB_PORT
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
            apiKey: process.env.EH_TMDB_API
        },
        savePath: {
            show: {
                fanart: process.env.EH_SHOW_FANART,
                poster: process.env.EH_SHOW_POSTER,
                episode: process.env.EH_EPISODE_IMAGE
            },
            movie: {
                fanart: process.env.EH_MOVIE_FANART,
                poster: process.env.EH_MOVIE_POSTER
            }
        }
    }
};

export default config;
export {config};
