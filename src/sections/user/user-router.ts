'use strict';

import {dependencyInjection} from 'autoinject';
import {UpcomingController} from './upcoming/upcoming-controller';
import {WatchedController} from './watched/watched-controller';

let upcomingController: UpcomingController = dependencyInjection(UpcomingController);
let watchedController: WatchedController = dependencyInjection(WatchedController);

const userRouts = [
    {
        method: 'GET',
        path: '/user/upcoming/episodes',
        handler: upcomingController.episodes,
        config: {
            bind: upcomingController
        }
    }, {
        method: 'GET',
        path: '/user/watched/movies',
        handler: watchedController.getWatchedMovies,
        config: {
            bind: watchedController
        }
    }, {
        method: 'GET',
        path: '/user/watched/shows',
        handler: watchedController.getWatchedShows,
        config: {
            bind: watchedController
        }
    }, {
        method: 'POST',
        path: '/user/watched/shows',
        handler: watchedController.setShowsAsWatched,
        config: {
            bind: watchedController
        }
    }, {
        method: 'POST',
        path: '/user/watched/movies',
        handler: watchedController.setMoviesAsWatched,
        config: {
            bind: watchedController
        }
    }
];

export {userRouts};
