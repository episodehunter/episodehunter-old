export interface WatchedMovie {
    ids: {
        id: number;
        theMoveDb: number;
        imdb: string;
    };
    year: number;
    title: string;
    originalTitle: string;
}

export interface WatchedMovieDatabase {
    id?: number;
    user_id: number;
    movie_id: number;
    time: number;
    type: number;
}
