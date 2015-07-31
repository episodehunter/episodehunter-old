import {autoInject} from 'autoinject';
import {UpcomingRepository} from './upcoming-repository';

@autoInject
class ServiesService {
    rep: UpcomingRepository;

    constructor(rep: UpcomingRepository) {
        this.rep = rep;
    }

    upcoming(userId: number) {
        return this.rep.get(userId).then(data => {
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
