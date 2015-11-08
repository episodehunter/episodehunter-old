import {inject} from 'autoinject';
import {series} from '../episodehunter-messages/database/series';
import {episode as episodeTable} from '../episodehunter-messages/database/episode';
import {database} from '../lib/database';
import {util, errorHandler} from '../lib/index';


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

    insertNewShow(show) {
        return this.db
            .insert(show)
            .into(series.$table);
    }

    insertNewEpisodes(episodes) {
        if (!Array.isArray(episodes)) {
            throw new Error('Episodes must be of type array');
        }

        let result = [];
        while (episodes.length > 0) {
            result.push(
                this.db.insert(
                    episodes.splice(0, 50)
                ).into(episodeTable.$table)
            )
        }

        return Promise.all(result);
    }

}

export default ShowDbReposetory;
export {ShowDbReposetory};
