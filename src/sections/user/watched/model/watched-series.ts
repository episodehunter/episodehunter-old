interface season {
    number: number;
    episodes: number[];
}

interface WatchedSeries {
    ids: {
        id: number;
        tvdbId: number;
        imdbId: string;
    };
    year: number;
    title: string;
    seasons: season[];
}

export {WatchedSeries};
