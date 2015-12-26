'use strict';

import Knex from 'knex';
import database from './lib/database';
import {show as showTable} from './episodehunter-messages/database/show';
import {movie as movieTable} from './episodehunter-messages/database/movie';
import {episode as episodeTable} from './episodehunter-messages/database/episode';

class DatabaseRepository {
    db: Knex;

    constructor(db = database) {
        this.db = db.connect();
    }

    getMovieFanartByTmdbId(tmdbId: number): Promise<{id: number; fanart: string}> {
        return this.db
            .first(
                movieTable.id,
                movieTable.fanart
            )
            .from(movieTable.$table)
            .where(movieTable.tmdbId, tmdbId);
    }

    updateMovieFanart(id: number, fanart: string) {
        return this.db(movieTable.$table)
            .where(movieTable.id, id)
            .update(movieTable.fanart, fanart);
    }

    getMoviePosterByTmdbId(tmdbId: number): Promise<{id: number; poster: string}> {
        return this.db
            .first(
                movieTable.id,
                movieTable.poster
            )
            .from(movieTable.$table)
            .where(movieTable.tmdbId, tmdbId);
    }

    updateMoviePoster(id: number, poster: string) {
        return this.db(movieTable.$table)
            .where(movieTable.id, id)
            .update(movieTable.poster, poster);
    }

    getShowFanartByTvdbId(tvdbId: number): Promise<{id: number; fanart: string}> {
        return this.db
            .first(
                showTable.id,
                showTable.fanart
            )
            .from(showTable.$table)
            .where(showTable.tvdbId, tvdbId);
    }

    updateShowFanart(id: number, fanart: string) {
        return this.db(showTable.$table)
            .where(showTable.id, id)
            .update(showTable.fanart, fanart);
    }

    getShowPosterByTvdbId(tvdbId: number): Promise<{id: number; poster: string}> {
        return this.db
            .first(
                showTable.id,
                showTable.poster
            )
            .from(showTable.$table)
            .where(showTable.tvdbId, tvdbId);
    }

    updateShowPoster(id: number, poster: string) {
        return this.db(showTable.$table)
            .where(showTable.id, id)
            .update(showTable.poster, poster);
    }

    getEpisodeImageByTvdbId(tvdbId: number): Promise<{id: number; image: string}> {
        return this.db
            .first(
                episodeTable.id,
                episodeTable.image
            )
            .from(episodeTable.$table)
            .where(episodeTable.tvdbId, tvdbId);
    }

    updateEpisodeImage(id: number, image: string) {
        return this.db(episodeTable.$table)
            .where(episodeTable.id, id)
            .update(episodeTable.image, image);
    }

}

export default DatabaseRepository;
export {DatabaseRepository};
