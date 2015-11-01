import {ShowIds} from 'eh-domain/model/handler/new';
import ShowService from './new-show.service';

class ShowController {
    showService: ShowService;

    constructor(showService: ShowService) {
        this.showService = showService;
    }

    addNewShow(ids: ShowIds) {
        return this.showService
            .addNewShow(ids);
    }

}

export {ShowController};
export default ShowController;
