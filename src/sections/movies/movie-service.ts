'use strict';

import Promise = require('bluebird');
import {autoInject} from 'autoinject';
import {Movie} from '../../model/movie';

@autoInject
class MovieService {

    constructor() {}

    getMovie(id: number): Promise<Movie> {
        return new Promise<Movie>(resolve => {
            var m = new Movie();
            m.id = id;
            m.title = 'Best film ever';
            setTimeout(() => resolve(Promise.resolve(m)), 500);
        });
    }

}

export {MovieService};
