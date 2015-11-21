import {show, episode, watchedEpisode} from '../episodehunter-messages/database/index';
import {database} from '../lib/database';
import {as} from '../lib/utility';

interface WatchedSeriesDatabaseInterface {
    show_id: number;
    show_tvdb_id: number;
    show_imdb_id: string;
    show_title: string;
    show_first_aired: string;
    episode: number;
    season: number;
}

function getWatchedEpisodes(userId: number): Promise<WatchedSeriesDatabaseInterface[]> {
    let model = {
        episode: episode,
        series: show,
        watched: watchedEpisode
    };

    return database
        .select(
            as(model.series.id, 'show_id'),
            as(model.series.tvdbId, 'show_tvdb_id'),
            as(model.series.imdbId, 'show_imdb_id'),
            as(model.series.title, 'show_title'),
            as(model.series.airs.first, 'show_first_aired'),
            model.watched.season,
            model.watched.episode
        )
        .from(model.watched.$table)
        .join(model.series.$table, model.series.id, model.watched.showId)
        .where(model.watched.userId, '=', userId)
        .groupBy(model.watched.showId, model.watched.season, model.watched.episode)
        .then(epesodes => {
            if (!epesodes) {
                return [];
            }
            return epesodes;
        });
}

export {getWatchedEpisodes};
export default {getWatchedEpisodes};
