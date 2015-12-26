'use strict';

class MovieDbMovie {
    id: number;
    title: string;
    originalTitle: string;
    imdbId: string;
    genres: string[];
    budget: number;
    runtime: number;
    productionCompanies: string[];
    spokenLanguages: string[];
    releaseDate: string;
    overview: string;
    tagline: string;
    poster: string;
    fanart: string;
    trailer: string;
}

export default MovieDbMovie;
export {MovieDbMovie};
