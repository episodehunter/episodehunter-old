import {database} from '../../../lib/db';

interface EpisodeInterface {
    id: number;
    name: string;
    season: number;
    episode: number;
    first_aired: string;
    overview: string;
    image: string;
    time: number;
};

class EpisodesService {

    getEpisodesForShowRaw(showId: number, userId: number): Promise<EpisodeInterface[]> {
        const model = {
            watched: database.model.watchedEpisode,
            episode: database.model.episode
        };

        return <any>database.q(model.watched.$table)
            .select(
                model.episode.id,
                model.episode.name,
                model.episode.season,
                model.episode.episode,
                model.episode.firstAired,
                model.episode.overview,
                model.episode.image,
                model.watched.time
            )
            .leftJoin(model.episode.$table, function() {
                this.on(model.watched.showId, model.episode.showId)
                    .andOn(model.episode.season, model.watched.season)
                    .andOn(model.episode.episode, model.watched.episode)
                    .andOn(model.watched.userId, userId);
            })
            .where(model.episode.showId, showId)
            .groupBy(model.episode.season, model.episode.episode);
    }

    getEpisodesForShow(showId: number, userId: number): Promise<any> {
        return this.getEpisodesForShowRaw(showId, userId)
            .then(episodes => {
                if (episodes === undefined) {
                    return [];
                }
                return episodes;
            })
            .then(episodes => {
                const seasons = {};
                episodes.forEach(episode => {
                    if (!(episode.season in seasons)) {
                        seasons[episode.season] = [];
                    }
                    seasons[episode.season].push({
                        id: episode.id,
                        name: episode.name,
                        episode: episode.episode,
                        season: episode.season,
                        firstAired: episode.first_aired,
                        overview: episode.overview,
                        image: episode.image,
                        watched: (episode.time ? (new Date(episode.time)).toISOString() : null)
                    });
                });
                return seasons;
            });
    }

}

export {EpisodesService};
