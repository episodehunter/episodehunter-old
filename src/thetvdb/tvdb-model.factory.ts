import {TvdbShowResponse} from './typings/tvdb-show-response';
import {TvdbShow} from './tvdb.model';

function tvDbFactory(response: TvdbShowResponse) {
    let show = new TvdbShow();
    let series = response.Series;
    show.id = series.id;
    show.imdb = series.IMDB_ID;
    show.name = series.SeriesName;
    show.airs = {
        dayOfWeek: series.Airs_DayOfWeek,
        time: series.Airs_Time,
        first: series.FirstAired
    };
    show.genre = series.Genre;
    show.language = series.Language;
    show.network = series.Network;
    show.overview = series.Overview;
    show.runtime = series.Runtime;
    show.status = series.Status;
    show.fanart = series.fanart;
    show.poster = series.poster;
    show.episodes = [];

    if (response.Episode) {
        let pushEpisode = episode => {
            show.episodes.push({
                id: episode.id,
                name: episode.EpisodeName,
                seasonNumber: episode.SeasonNumber,
                episodeNumber: episode.EpisodeNumber,
                firstAired: episode.FirstAired,
                overview: episode.Overview,
                thumbnail: episode.filename
            });
        }

        if (Array.isArray(response.Episode)) {
            response.Episode.forEach(pushEpisode);
        } else {
            pushEpisode(response.Episode);
        }
    }


    return show;
}

export default tvDbFactory;
export {tvDbFactory};
