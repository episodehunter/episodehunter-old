class Movie {
    ids: {
        id: number;
        tmdb: number;
        imdb: string;
    };
    title: string;
    orginalTitle: string;
    genre: Array<string>;
    tagline: string;
    runtime: number;
    spokenLang: Array<string>;
    companies: Array<string>;
    trailer: string;
    releaseDate: string;
    year: number;
    budget: number;
    overview: string;
    poster: string;
    fanart: string;
}

export {Movie};
