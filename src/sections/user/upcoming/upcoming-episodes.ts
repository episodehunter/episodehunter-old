import {autoInject} from 'autoinject';
import {extractYear} from '../../../lib/utility/dates';
import {UpcomingRepository} from './upcoming-repository';
import {UpcomingEpisode} from './model/upcomping-model';

@autoInject
class UpcomingEpiosdes {

    upcomingRep: UpcomingRepository;

    constructor(upcomingRep: UpcomingRepository) {
        this.upcomingRep = upcomingRep;
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
                        year: extractYear(el.series_first_aired),
                        poster: el.series_poster,
                        fanart: el.series_fanart
                    }
                };
            });
        });
    }

}

export {UpcomingEpiosdes};
