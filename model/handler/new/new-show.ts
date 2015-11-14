declare module 'eh-domain/model/handler/new' {

    export interface ShowIds {
        id: number;
        tvdbId: number;
        imdbId: string;
    }

    export interface EpisodesIds {
        id: number;
        tvdbId: number;
        tvdbShowId: number;
    }

}
