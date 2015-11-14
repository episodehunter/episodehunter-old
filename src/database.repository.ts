'use strict';

import Knex from 'knex';
import {ShowIds} from 'eh-domain/model/handler/new';
import {series} from './episodehunter-messages/database/series';
import {episode as episodeTable} from './episodehunter-messages/database/episode';
import database from './lib/database';
import {TvdbShow} from './thetvdb/tvdb.model';
import transformer from './thetvdb.transformer';


class ShowDbReposetory {
    db: Knex;

    constructor(db = database) {
        this.db = db.connect();
    }

    serieExistWithTvdbId(tvdbId: number): Promise<boolean> {
        return this.getShowIdByTvdbId(tvdbId)
            .then(id => !!id);
    }

    getShowIdByTvdbId(tvdbId: number): Promise<number> {
        return this.db
            .first(series.id)
            .from(series.$table)
            .where(series.tvdbId, tvdbId)
            .then(result => result ? result.id : undefined);
    }

    updateShow(id: number, show: TvdbShow) {
        return this.db(series.$table)
            .where(series.id, id)
            .update(
                transformer.transformShowForDbInsert(show)
            );
    }

    insertShowWithEpisodes(show: TvdbShow) {
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

    insertShow(show, engine: any = this.db) {
        return engine
            .insert(show)
            .into(series.$table);
    }

    insertEpisodes(episodes, engine: any = this.db): Promise<any[]|string> {
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
