'use strict';

import {TvdbShow} from './thetvdb/tvdb.model';
import queue from './lib/queue';
import imageIngestor from './episodehunter-messages/queue/image-ingestor';

function requestDownload(show: TvdbShow) {
    if (show.fanart) {
        queue.addToQueue(imageIngestor.addOrUpdate.show.fanart, {
            filename: show.fanart
        }, {
            attempts: 2
        });
    }

    if (show.poster) {
        queue.addToQueue(imageIngestor.addOrUpdate.show.poster, {
            filename: show.poster
        }, {
            attempts: 2
        });
    }

    show.episodes.forEach(episode => {
        if (episode.thumbnail) {
            queue.addToQueue(imageIngestor.addOrUpdate.show.episode, {
                filename: episode.thumbnail
            }, {
                attempts: 2
            });
        }
    });

    return true;
}

export default {requestDownload};
export {requestDownload};
