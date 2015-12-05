import {autoInject} from 'autoinject';
import {database} from '../../lib/db';
import {as} from '../../lib/utility/database';

interface ShowDatabaseInterface {
    id: number;
    tvdbId: number;
    imdbId: string;
    title: string;
    dayOfWeek: string;
    time: string;
    first: string;
    genre: string;
    language: string;
    network: string;
    overview: string;
    runtime: string;
    status: string;
    fanart: string;
    poster: string;
}

@autoInject
class ShowRepository {

    get(showId: number): Promise<ShowDatabaseInterface> {
        let model = database.model.show;

        return database.q
            .first(
                model.id,
                as(model.tvdbId, 'tvdbId'),
                as(model.imdbId, 'imdbId'),
                as(model.title, 'title'),
                as(model.airs.dayOfWeek, 'dayOfWeek'),
                as(model.airs.time, 'time'),
                as(model.airs.first, 'first'),
                model.genre,
                model.language,
                model.network,
                model.overview,
                model.runtime,
                model.status,
                model.fanart,
                model.poster
            )
            .from(model.$table)
            .where(model.id, '=', showId)
            .then(show => {
                if (show === undefined) {
                    return Promise.reject(404);
                }
                return show;
            });
    }

}

export {ShowRepository};
