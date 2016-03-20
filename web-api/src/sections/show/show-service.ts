import { autoInject } from 'autoinject';
import { extractYear } from '../../lib/utility/dates';
import { ShowRepository } from './show-repository';
import { Show } from './model/show-model';

@autoInject
class ShowService {
    showRep: ShowRepository;

    constructor(showRep: ShowRepository) {
        this.showRep = showRep;
    }

    convertGenre(rawGenre: string): Array<string> {
        if (typeof rawGenre !== 'string') {
            return [];
        } else {
            return (rawGenre
                .split('|')
                .filter(g => g !== ''));
        }
    }

    getShow(id: number): Promise<Show> {
        return this.showRep.get(id)
            .then(show => {
                return {
                    ids: {
                        id: show.id
                    },
                    title: show.title,
                    year: extractYear(show.first),
                    airs: {
                        dayOfWeek: show.dayOfWeek,
                        time: show.time,
                        first: show.first
                    },
                    genre: this.convertGenre(show.genre),
                    language: show.language,
                    network: show.network,
                    overview: show.overview,
                    runtime: show.runtime,
                    status: show.status,
                    fanart: show.fanart,
                    poster: show.poster
                };
            });
    }

}

export {ShowService};
