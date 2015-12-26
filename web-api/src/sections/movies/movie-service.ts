import {autoInject} from 'autoinject';
import {parseJson} from '../../lib/utility/type-conversion';
import {extractYear} from '../../lib/utility/dates';
import {Movie} from './model/movie';
import {MovieRepository} from './movie-repository';

@autoInject
class MovieService {
    repository: MovieRepository;

    constructor(repository: MovieRepository) {
        this.repository = repository;
    }

    getMovie(id: number): Promise<Movie> {
        return this.repository
            .get(id)
            .then(movie => {
                return {
                    ids: {
                        id: movie.id,
                        tmdb: movie.tmdb_id,
                        imdb: movie.imdb_id
                    },
                    title: movie.title,
                    orginalTitle: movie.orginal_title,
                    genre: parseJson(movie.genre),
                    tagline: movie.tagline,
                    runtime: movie.runtime,
                    spokenLang: parseJson(movie.spoken_lang),
                    companies: parseJson(movie.companies),
                    trailer: movie.trailer,
                    releaseDate: movie.release_date,
                    year: extractYear(movie.release_date),
                    budget: movie.budget,
                    overview: movie.overview,
                    poster: movie.poster,
                    fanart: movie.fanart
                };
            });
    }

}

export {MovieService};
