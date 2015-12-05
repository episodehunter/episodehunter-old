import {Show} from '../../../show/model/show-model';

interface UpcomingEpisode {
    ids: {
        id: number
    };
    title: string;
    season: number;
    episode: number;
    airs: string;
    thumbnail: string;
    show: Show;
}

export {UpcomingEpisode};
