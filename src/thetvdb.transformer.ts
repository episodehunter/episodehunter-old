'use strict';

import {ShowIds} from 'eh-domain/model/ingest/new';
import {episode as episodeTable} from './episodehunter-messages/database/episode';
import {show as showTable} from './episodehunter-messages/database/show';
import {TvdbEpisode, TvdbShow} from './thetvdb/tvdb.model';
import utility from './lib/utility';

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
            [episodeTable.overview]: episode.overview,
            [episodeTable.lastupdate]: utility.currentUnixtime()
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
        [showTable.language]: show.language,
        [showTable.network]: show.network,
        [showTable.overview]: show.overview,
        [showTable.runtime]: show.runtime,
        [showTable.status]: show.status,
        [showTable.lastupdate]: utility.currentUnixtime()
    };
}

export default {transformEpisodesForDBinsert, transformShowForDbInsert};
export {transformEpisodesForDBinsert, transformShowForDbInsert};
