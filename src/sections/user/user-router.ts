'use strict';

import {UpcomingController} from './upcoming/upcoming-controller';
import {WatchedController} from './watched/watched-controller';
import {dependencyInjection} from '../../lib/ioc';
let upcomingController = dependencyInjection<UpcomingController>(UpcomingController);
let watchedController = dependencyInjection<WatchedController>(WatchedController);

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
