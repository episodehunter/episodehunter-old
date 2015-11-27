import {Series} from '../../../series/model/series-model';

interface UpcomingEpisode {
    ids: {
        id: number
    };
    title: string;
    season: number;
    episode: number;
    airs: string;
    thumbnail: string;
    show: Series;
}

export {UpcomingEpisode};
