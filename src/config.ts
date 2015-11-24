'use strict';

const config = {
    appName: 'episodehunter-movie-ingest',
    logger: {
        level: 'debug',
        filePath: `../../log/episodehunter-movie-ingest.txt`
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
    theMovieDb: {
        url: 'https://api.themoviedb.org/3/movie/',
        api: process.env.EH_TMDB_API
    }
};

export default config;
export {config};
