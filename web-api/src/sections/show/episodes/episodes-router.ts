import { number } from 'joi';
import { dependencyInjection } from 'autoinject';
import { EpisodesController } from './episodes-controller';

const controller: EpisodesController = dependencyInjection(EpisodesController);

const episodesRouts = [
    {
        method: 'GET',
        path: '/show/{id}/episodes',
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

export {episodesRouts};
