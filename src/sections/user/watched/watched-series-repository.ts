'use strict';

import {autoInject} from 'autoinject';
import {database} from '../../../lib/db';
import {as} from '../../../lib/utility/database';

interface WatchedSeriesDatabaseInterface {
    show_id: number;
    show_tvdb_id: number;
    show_imdb_id: string;
    show_title: string;
    show_first_aired: string;
    episode: number;
    season: number;
}

@autoInject
class WatchedSeriesRepository {

    getAll(userId: number): Promise<Array<WatchedSeriesDatabaseInterface>> {
        let model = {
            episode: database.model.episodeModel,
            series: database.model.seriesModel,
            watched: database.model.watchedEpisodeModel
        };

        return database.q
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

}

export {WatchedSeriesRepository, WatchedSeriesDatabaseInterface};
