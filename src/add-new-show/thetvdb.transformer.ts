import {ShowIds} from 'eh-domain/model/handler/new';
import {episode as episodeTable} from '../episodehunter-messages/database/episode';
import {series as showTable} from '../episodehunter-messages/database/series';
import {TvdbEpisode, TvdbShow} from '../thetvdb/tvdb.model';

function transformEpisodesForDBinsert(showId: ShowIds, tvdbEpisodes: TvdbEpisode[]) {
    let result = [];
    tvdbEpisodes.forEach(episode => {
        result.push({
            [episodeTable.tvdbId]: episode.id,
            [episodeTable.seriesTvdbId]: showId.tvdbId,
            [episodeTable.seriesId]: showId.id,
            [episodeTable.name]: episode.name,
            [episodeTable.season]: episode.seasonNumber,
            [episodeTable.episode]: episode.episodeNumber,
            [episodeTable.firstAired]: episode.firstAired,
            [episodeTable.overview]: episode.overview
        });
    });
    return result;
}

function transformShowForDbInsert(show: TvdbShow) {
    return {
        [showTable.tvdbId]: show.id,
        [showTable.imdbId]: show.imdb,
        [showTable.title]: show.name,
        [showTable.airs.dayOfWeek]: show.airs.dayOfWeek,
        [showTable.airs.time]: show.airs.time,
        [showTable.airs.first]: show.airs.first,
        [showTable.genre]: show.genre,
        [showTable.language]: show.genre,
        [showTable.network]: show.network,
        [showTable.overview]: show.overview,
        [showTable.runtime]: show.runtime,
        [showTable.status]: show.status
    };
}

export default {transformEpisodesForDBinsert, transformShowForDbInsert};
export {transformEpisodesForDBinsert, transformShowForDbInsert};
