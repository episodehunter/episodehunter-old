'use strict';

import queue from 'episodehunter-queue';
import MovieDbMovie from './moviedb/moviedb.model';
import imageIngest from 'messages/queue/image-ingest';

function requestDownload(movie: MovieDbMovie) {
    if (movie.fanart) {
        queue.addToQueue(imageIngest.addOrUpdate.movie.fanart, {
            filename: movie.fanart
        }, {
            attempts: 2
        });
    }

    if (movie.poster) {
        queue.addToQueue(imageIngest.addOrUpdate.movie.poster, {
            filename: movie.poster
        }, {
            attempts: 2
        });
    }

    return true;
}

export default {requestDownload};
export {requestDownload};
