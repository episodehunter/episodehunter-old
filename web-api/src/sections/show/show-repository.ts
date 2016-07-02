import { autoInject } from 'autoinject';
import { db } from '../../lib/db';
import { showTable } from '../../contracts/database/show';
import { as } from '../../lib/utility/database';

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
        return <any>db.first(
            showTable.id,
            as(showTable.tvdb_id, 'tvdbId'),
            as(showTable.imdb_id, 'imdbId'),
            as(showTable.name, 'title'),
            as(showTable.airs_dayOfWeek, 'dayOfWeek'),
            as(showTable.airs_time, 'time'),
            as(showTable.first_aired, 'first'),
            showTable.genre,
            showTable.language,
            showTable.network,
            showTable.overview,
            showTable.runtime,
            showTable.status,
            showTable.fanart,
            showTable.poster
        )
        .from(showTable.$table)
        .where(showTable.id, '=', showId)
        .then(show => {
            if (show === undefined) {
                return Promise.reject(404);
            }
            return show;
        });
    }

}

export { ShowRepository };
