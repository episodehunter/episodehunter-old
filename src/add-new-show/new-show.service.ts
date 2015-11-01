import {ShowIds} from 'eh-domain/model/handler/new';
import TvDbRepository from '../thetvdb/tvdb-repository';

class ShowService {
    public tvDbRepo: TvDbRepository;

    constructor(tvDbRepo: TvDbRepository) {
        this.tvDbRepo = tvDbRepo;
    }

    addNewShow(ids: ShowIds) {
        return this.tvDbRepo
            .getShow(ids.tvdbId)
            .then(show => {

            });
    }
}

export {ShowService};
export default ShowService;
