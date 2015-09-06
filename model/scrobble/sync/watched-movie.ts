declare module 'eh-domain/model/scrobble/sync' {

    interface WatchedMovie {
        ids: {
            id: number;
            theMoveDb: number;
            imdb: string;
        };
        year: number;
        title: string;
        orginalTitle: string;
    }

}
