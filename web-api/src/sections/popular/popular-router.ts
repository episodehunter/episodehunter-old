import { string } from 'joi';
import { dependencyInjection } from 'autoinject';
import { PopularController } from './popular-controller';

const controller: PopularController = dependencyInjection(PopularController);

const popularRouts = [
    {
        method: 'GET',
        path: '/popular/shows/{since?}',
        handler: controller.getShows,
        config: {
            bind: controller,
            validate: {
                params: {
                    since: string()
                }
            }
        }
    }, {
        method: 'GET',
        path: '/popular/movies/{since?}',
        handler: controller.getMovies,
        config: {
            bind: controller,
            validate: {
                params: {
                    since: string()
                }
            }
        }
    }
];

export {popularRouts};
