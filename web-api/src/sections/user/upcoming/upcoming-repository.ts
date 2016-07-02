import { autoInject } from 'autoinject';
import { showTable, episodeTabel, followingShowTable } from '../../../contracts/database';
import { db } from '../../../lib/db';
import { as } from '../../../lib/utility/database';
import { today } from '../../../lib/utility/dates';

interface UpcompingDatabaseInterface {
    id: number;
    thumbnail: string;
    title: string;
    show_id: number;
    show_title: string;
    show_first_aired: string;
    show_poster: string;
    show_fanart: string;
    season: number;
    episode: number;
    airs: string;
}

@autoInject
class UpcomingRepository {

    get(userId: number): Promise<UpcompingDatabaseInterface[]> {
        let limit = 100;

        const t = <any> db.select(
                episodeTabel.id,
                episodeTabel.image,
                as(episodeTabel.name, 'title'),
                as(showTable.id, 'show_id'),
                as(showTable.name, 'show_title'),
                as(showTable.first_aired, 'show_first_aired'),
                as(showTable.poster, 'show_poster'),
                as(showTable.fanart, 'show_fanart')
            )
            .max(as(episodeTabel.season, 'season'))
            .min(as(episodeTabel.episode, 'episode'))
            .min(as(episodeTabel.first_aired, 'airs'))
            .from(followingShowTable.$table)
            .rightJoin(showTable.$table, followingShowTable.show_id, showTable.id)
            .rightJoin(episodeTabel.$table, function() {
                this.on(followingShowTable.show_id, '=', episodeTabel.serie_id)
                    .on(episodeTabel.season, '!=', db.raw('0'))
                    .on(episodeTabel.episode, '!=', db.raw('0'))
                    .on(episodeTabel.first_aired, '>=', db.raw('"' + today() + '"'));
            })
            .where(followingShowTable.user_id, '=', userId)
            .where(function() {
                this.where(showTable.status, '=', 'Continuing')
                    .orWhereNotNull(episodeTabel.episode);
            })
            .groupBy(followingShowTable.id)
            .orderBy(episodeTabel.first_aired)
            .limit(limit);
        return t.then(epesodes => {
            if (!epesodes) {
                return [];
            }
            return epesodes;
        });
    }

}

export {UpcomingRepository};
