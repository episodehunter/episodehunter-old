import {show, episode, watchedEpisode} from '../episodehunter-messages/database/index';
import {database} from '../lib/database';
import {as} from '../lib/utility';

interface WatchedShowDatabaseInterface {
    show_id: number;
    show_tvdb_id: number;
    show_imdb_id: string;
    show_title: string;
    show_first_aired: string;
    episode: number;
    season: number;
}

function getWatchedEpisodes(userId: number): Promise<WatchedShowDatabaseInterface[]> {
    let model = {
        episode: episode,
        show: show,
        watched: watchedEpisode
    };

    return database
        .select(
            as(model.show.id, 'show_id'),
            as(model.show.tvdbId, 'show_tvdb_id'),
            as(model.show.imdbId, 'show_imdb_id'),
            as(model.show.title, 'show_title'),
            as(model.show.airs.first, 'show_first_aired'),
            model.watched.season,
            model.watched.episode
        )
        .from(model.watched.$table)
        .join(model.show.$table, model.show.id, model.watched.showId)
        .where(model.watched.userId, '=', userId)
        .groupBy(model.watched.showId, model.watched.season, model.watched.episode)
        .then(episodes => {
            if (!episodes) {
                return [];
            }
            return episodes;
        });
}

export {getWatchedEpisodes};
export default {getWatchedEpisodes};
