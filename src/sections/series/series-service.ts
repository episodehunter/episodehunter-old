import {autoInject} from 'autoinject';
import {SeriesRepository} from './series-repository';
import {UpcomingRepository} from './upcoming-repository';
import {Series} from './model/series-model';
import {UpcomingEpisode} from './model/upcomping-model';

@autoInject
class ServiesService {

    upcomingRep: UpcomingRepository;
    seriesRep: SeriesRepository;

    constructor(upcomingRep: UpcomingRepository, seriesRep: SeriesRepository) {
        this.upcomingRep = upcomingRep;
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

    upcoming(userId: number): Promise<UpcomingEpisode[]> {
        return this.upcomingRep.get(userId).then(data => {
            return data.map(el => {
                return {
                    ids: {
                        id: el.id
                    },
                    title: el.title,
                    season: el.season,
                    episode: el.episode,
                    airs: el.airs,
                    thumbnail: el.thumbnail,
                    show: {
                        ids: {
                            id: el.series_id
                        },
                        title: el.series_title,
                        year: 0,
                        poster: el.series_poster,
                        fanart: el.series_fanart
                    }
                };
            });
        });
    }

}

export {ServiesService};
