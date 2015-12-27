'use strict';

import {autoInject} from 'autoinject';
import {ShowIds} from 'eh-domain/model/ids';
import ShowService from './show.service';


@autoInject
class ShowController {
    showService: ShowService;

    constructor(showService: ShowService) {
        this.showService = showService;
    }

    addNewShow(ids: ShowIds) {
        return this.showService
            .addNewShow(ids);
    }

    updateShow(ids: ShowIds) {
        return this.showService
            .updateShow(ids);
    }

}

export {ShowController};
export default ShowController;
