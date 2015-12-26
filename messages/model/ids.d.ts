declare module 'eh-domain/model/ids' {

    export interface ShowIds {
        id: number;
        tvdbId: number;
        imdbId: string;
    }

    export interface MovieIds {
        id: number;
        tmdbId: number;
        imdbId: string;
    }

    export interface EpisodeIds {
        id: number;
        showId: number;
        tvdbId: number;
        tvdbShowId: number;
    }

}
