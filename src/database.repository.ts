'use strict';

import {ShowIds} from 'eh-domain/model/handler/new';
import {series} from './episodehunter-messages/database/series';
import {episode as episodeTable} from './episodehunter-messages/database/episode';
import database from './lib/database';
import {util, errorHandler} from './lib/index';
import transformer from './thetvdb.transformer';


class ShowDbReposetory {
    db;

    constructor(db = database) {
        this.db = db.connect();
    }

    serieExistWithTvdbId(tvdbId: number): Promise<boolean|string> {
        if (!util.isNumric(tvdbId)) {
            return Promise.reject<string>('Invalid tvdbId');
        }

        return this.db
            .first(series.id)
            .from(series.$table)
            .where(series.tvdbId, tvdbId)
            .catch(errorHandler.catchDbError)
            .then(result => {
                if (result && result.id) {
                    return true;
                }
                return false;
            });
    }

    insertShowWithEpisodes(show) {
        return this.db.transaction(trx => {
            return this.insertShow(
                transformer.transformShowForDbInsert(show),
                trx
            )
            .then(showId => {
                const ids: ShowIds = {
                    id: showId,
                    tvdbId: show.id,
                    imdbId: show.imdb
                };
                return this.insertEpisodes(
                    transformer.transformEpisodesForDBinsert(ids, show.episodes),
                    trx
                )
            });
        });
    }

    insertShow(show, engine = this.db) {
        return engine
            .insert(show)
            .into(series.$table);
    }

    insertEpisodes(episodes, engine = this.db): Promise<any[]|string> {
        if (!Array.isArray(episodes)) {
            return Promise.reject<string>('Episodes must be of type array');
        }

        const result = [];
        while (episodes.length > 0) {
            result.push(
                engine.insert(
                    episodes.splice(0, 50)
                )
                .into(episodeTable.$table)
            )
        }

        return Promise.all(result);
    }

}

export default ShowDbReposetory;
export {ShowDbReposetory};
