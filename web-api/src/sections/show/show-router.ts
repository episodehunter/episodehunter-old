import { number } from 'joi';
import { dependencyInjection } from 'autoinject';
import { ShowController } from './show-controller';
import { episodesRouts } from './episodes/episodes-router';

const controller: ShowController = dependencyInjection(ShowController);

const showRouts = [
    {
        method: 'GET',
        path: '/show/{id}',
        handler: controller.get,
        config: {
            bind: controller,
            validate: {
                params: {
                    id: number().required()
                }
            }
        }
    },
    ...episodesRouts
];

export {showRouts};
