interface Series {
    ids: {
        id: number;
        tvdbId?: number;
        imdbId?: string;
    };
    title: string;
    airs?: {
        dayOfWeek: string;
        time: string;
        first: string;
    }
    year: number;
    genre?: string;
    language?: string;
    network?: string;
    overview?: string;
    runtime?: string;
    status?: string;
    fanart?: string;
    poster?: string;
}

export {Series};
