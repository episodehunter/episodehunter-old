import {autoInject} from 'autoinject';
import {SeriesRepository} from './series-repository';
import {Series} from './model/series-model';

@autoInject
class ServiesService {

    seriesRep: SeriesRepository;

    constructor(seriesRep: SeriesRepository) {
        this.seriesRep = seriesRep;
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

    getSeries(id: number): Promise<Series> {
        return this.seriesRep.get(id)
            .then(series => {
                return {
                    ids: {
                        id: series.id
                    },
                    title: series.title,
                    year: 0,
                    airs: {
                        dayOfWeek: series.dayOfWeek,
                        time: series.time,
                        first: series.first
                    },
                    genre: this.convertGenre(series.genre),
                    language: series.language,
                    network: series.network,
                    overview: series.overview,
                    runtime: series.runtime,
                    status: series.status,
                    fanart: series.fanart,
                    poster: series.poster
                }
            });
    }

}

export {ServiesService};
