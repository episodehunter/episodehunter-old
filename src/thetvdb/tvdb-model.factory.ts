'use strict';

import {int} from '../lib/utility';
import {TvdbShowResponse, TvdbEpisodeResponse} from './typings/tvdb-show-response';
import {TvdbShow, TvdbEpisode} from './tvdb.model';

function tvdbEpisodeFactory(response: TvdbEpisodeResponse) {
    const episode = new TvdbEpisode();
    const _episode = response.Episode;
    episode.id = int(_episode.id);
    episode.name = _episode.EpisodeName;
    episode.seasonNumber = int(_episode.SeasonNumber);
    episode.episodeNumber = int(_episode.EpisodeNumber);
    episode.firstAired = _episode.FirstAired;
    episode.overview = _episode.Overview;
    episode.thumbnail = _episode.filename;

    return episode;
}

function tvdbShowFactory(response: TvdbShowResponse) {
    const show = new TvdbShow();
    const series = response.Series;
    show.id = int(series.id);
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
    show.runtime = int(series.Runtime);
    show.status = series.Status;
    show.fanart = series.fanart;
    show.poster = series.poster;
    show.episodes = [];

    if (response.Episode) {
        const pushEpisode = episode => {
            show.episodes.push({
                id: int(episode.id),
                name: episode.EpisodeName,
                seasonNumber: int(episode.SeasonNumber),
                episodeNumber: int(episode.EpisodeNumber),
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

export default {tvdbShowFactory, tvdbEpisodeFactory};
export {tvdbShowFactory, tvdbEpisodeFactory};
