import { autoInject } from 'autoinject';
import { database } from '../../../lib/db';
import { as } from '../../../lib/utility/database';

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

    get(userId: number): Promise<Array<UpcompingDatabaseInterface>> {
        let today = new Date().toISOString().slice(0, 10);
        let limit = 100;
        let raw = database.q.raw;

        let model = {
            show: database.model.show,
            episode: database.model.episode,
            follow: database.model.followingShow
        };

        return <any>database.q
            .select(
                model.episode.id,
                model.episode.image,
                as(model.episode.name, 'title'),
                as(model.show.id, 'show_id'),
                as(model.show.title, 'show_title'),
                as(model.show.airs.first, 'show_first_aired'),
                as(model.show.poster, 'show_poster'),
                as(model.show.fanart, 'show_fanart')
            )
            .max(as(model.episode.season, 'season'))
            .min(as(model.episode.episode, 'episode'))
            .min(as(model.episode.firstAired, 'airs'))
            .from(model.follow.$table)
            .leftJoin(model.show.$table, model.follow.showId, model.show.id)
            .leftJoin(model.episode.$table, function() {
                this.on(model.follow.showId, '=', model.episode.showId)
                    .on(model.episode.season, '!=', raw('0'))
                    .on(model.episode.episode, '!=', raw('0'))
                    .on(model.episode.firstAired, '>=', raw('"' + today + '"'));
            })
            .where(model.follow.userId, '=', userId)
            .where(function() {
                this.where(model.show.status, '=', 'Continuing')
                    .orWhereNotNull(model.episode.episode);
            })
            .groupBy(model.follow.id)
            .orderBy(model.episode.firstAired)
            .limit(limit)
            .then(epesodes => {
                if (!epesodes) {
                    return [];
                }
                return epesodes;
            });
    }

}

export {UpcomingRepository};
