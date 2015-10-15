import {TvdbShowResponse} from './typings/tvdb-show-response';

class TvdbEpisode {
    id: number;
    name: string;
    seasonNumber: number;
    episodeNumber: number;
    firstAired: string;
    overview: string;
    thumbnail: string;
}

class TvdbShow {
    id: number;
    imdb: string;
    name: string;
    airs: {
        dayOfWeek: string;
        time: string;
        first: string;
    };
    genre: string;
    language: string;
    network: string;
    overview: string;
    runtime: number;
    status: string;
    fanart: string;
    poster: string;

    episodes: TvdbEpisode[];

    static factory(response: TvdbShowResponse) {
        let show = new TvdbShow();
        let series = response.Series;
        show.id = series.id;
        show.imdb = series.IMDB_ID;
        show.name = series.SeriesName;
        show.airs = {
            dayOfWeek: series.Airs_DayOfWeek,
            time: series.Airs_Time,
            first: series.FirstAired
        };
        show.genre = series.Genre;
        show.language = series.Language;
        show.network = series.Network;
        show.overview = series.Overview;
        show.runtime = series.Runtime;
        show.status = series.Status;
        show.fanart = series.fanart;
        show.poster = series.poster;
        show.episodes = [];

        if (Array.isArray(response.Episode)) {
            response.Episode.forEach(episode => {
                show.episodes.push({
                    id: episode.id,
                    name: episode.EpisodeName,
                    seasonNumber: episode.SeasonNumber,
                    episodeNumber: episode.EpisodeNumber,
                    firstAired: episode.FirstAired,
                    overview: episode.Overview,
                    thumbnail: episode.filename
                });
            });
        } else if (response.Episode) {
            let episode = <any>response.Episode;
            show.episodes.push({
                id: episode.id,
                name: episode.EpisodeName,
                seasonNumber: episode.SeasonNumber,
                episodeNumber: episode.EpisodeNumber,
                firstAired: episode.FirstAired,
                overview: episode.Overview,
                thumbnail: episode.filename
            });
        }

        return show;
    }
}

export {TvdbShow, TvdbEpisode};
