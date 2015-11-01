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

}

export default TvdbShow;
export {TvdbShow, TvdbEpisode};
