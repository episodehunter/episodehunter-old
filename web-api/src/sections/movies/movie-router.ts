import { number } from 'joi';
import { dependencyInjection } from 'autoinject';
import { MovieController } from './movie-controller';

const controller: MovieController = dependencyInjection(MovieController);

const movieRouts = [
    {
        method: 'GET',
        path: '/movie/{id}',
        handler: controller.get,
        config: {
            bind: controller,
            validate: {
                params: {
                    id: number().required()
                }
            }
        }
    }
];

export { movieRouts };
