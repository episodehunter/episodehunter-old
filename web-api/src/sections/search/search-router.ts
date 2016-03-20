import { string } from 'joi';
import { dependencyInjection } from 'autoinject';
import { SearchController } from './search-controller';

const controller: SearchController = dependencyInjection(SearchController);

const searchRoute = [
    {
        method: 'GET',
        path: '/search/{term}',
        handler: controller.search,
        config: {
            bind: controller,
            validate: {
                params: {
                    term: string().required()
                }
            }
        }
    }
];

export {searchRoute};
