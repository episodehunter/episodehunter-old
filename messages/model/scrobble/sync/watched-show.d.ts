declare module 'eh-domain/model/scrobble/sync' {

    interface Dictionary<T> {
        [key: string]: T;
    }

    export interface season {
        number: number;
        episodes: number[];
    }

    export interface ShowIds {
        id: number;
        tvdbId: number;
        imdbId: string;
    }

    export interface WatchedShow {
        ids: ShowIds;
        year: number;
        title: string;
        seasons: Dictionary<Array<number>>;
    }

    export interface WatchedEpisodeDatabase {
        id?: number;
        user_id: number;
        show_id: number;
        season: number;
        episode: number;
        time: number;
        type: number;
    }

}
