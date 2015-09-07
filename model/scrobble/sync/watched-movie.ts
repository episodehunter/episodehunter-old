declare module 'eh-domain/model/scrobble/sync' {

    export interface WatchedMovie {
        ids: {
            id: number;
            theMoveDb: number;
            imdb: string;
        };
        year: number;
        title: string;
        orginalTitle: string;
    }

    export interface WatchedMovieDatabase {
        id?: number;
        user_id: number;
        movie_id: number;
        time: number;
        type: number;
    }

}
