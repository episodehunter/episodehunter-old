import {ShowIds} from 'eh-domain/model/handler/new';
import tvdbRepo from '../thetvdb/thetvdb-repository';

function addNewShow(ids: ShowIds) {
    tvdbRepo.getShow(ids.tvdbId)
        .then(show => {

        })
}
