import queue from 'episodehunter-queue';
import {imageIngest} from 'messages/queue/image-ingest';
import {TvdbShow} from './thetvdb/tvdb.model';

function requestDownload(show: TvdbShow) {
    if (show.fanart) {
        queue.addToQueue(imageIngest.addOrUpdate.show.fanart, {
            filename: show.fanart
        }, {
            attempts: 2
        });
    }

    if (show.poster) {
        queue.addToQueue(imageIngest.addOrUpdate.show.poster, {
            filename: show.poster
        }, {
            attempts: 2
        });
    }

    show.episodes.forEach(episode => {
        if (episode.thumbnail) {
            queue.addToQueue(imageIngest.addOrUpdate.episode, {
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
