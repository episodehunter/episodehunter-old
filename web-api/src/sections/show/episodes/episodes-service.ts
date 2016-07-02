import { db } from '../../../lib/db';
import { episodeTabel, watchedEpisode } from '../../../contracts/database';

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
        return <any>db(watchedEpisode.$table)
            .select(
                episodeTabel.id,
                episodeTabel.name,
                episodeTabel.season,
                episodeTabel.episode,
                episodeTabel.first_aired,
                episodeTabel.overview,
                episodeTabel.image,
                watchedEpisode.time
            )
            .leftJoin(episodeTabel.$table, function() {
                this.on(watchedEpisode.showId, episodeTabel.serie_id)
                    .andOn(episodeTabel.season, watchedEpisode.season)
                    .andOn(episodeTabel.episode, watchedEpisode.episode)
                    .andOn(watchedEpisode.userId, userId);
            })
            .where(episodeTabel.serie_id, showId)
            .groupBy(episodeTabel.season, episodeTabel.episode);
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
