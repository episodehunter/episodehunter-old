/* @flow */
'use strict';

var upcomingRepository = require('./upcoming_repository');

class ServiesService {

    rep: upcomingRepository;

    constructor(_rep: upcomingRepository) {
        this.rep = _rep;
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
                        year: el.series_year,
                        poster: el.series_poster,
                        fanart: el.series_fanart
                    }
                };
            });
        });
    }

}

ServiesService.inject = [upcomingRepository];

export default ServiesService;
