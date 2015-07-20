/* @flow */
'use strict';

var db = require('../../lib/db');

class UpcomingRepository {

    db: Database;

    constructor(_db: Database) {
        this.db = _db;
    }

    get(userId: number) {
        var today = new Date().toISOString().slice(0, 10);
        var limit = 100;
        var raw = this.db.q.raw;

        var model = {
            series: this.db.model.series,
            episode: this.db.model.episode,
            follow: this.db.model.followSeries
        };

        return this.db.q
            .select(
                model.episode.id,
                model.episode.thumbnail,
                model.episode.title + ' as title',
                model.series.id + ' as series_id',
                model.series.title + ' as series_title',
                model.series.airs.first + ' as series_first_aired',
                model.series.poster + ' as series_poster',
                model.series.fanart + ' as series_fanart'
            )
            .max(model.episode.seasonNr + ' as season')
            .min(model.episode.episodeNr + ' as episode')
            .min(model.episode.firstAired + ' as airs')
            .from(model.follow.$table)
            .leftJoin(model.series.$table, model.follow.seriesId, model.series.id)
            .leftJoin(model.episode.$table, function() {
                this.on(model.follow.seriesId, '=', model.episode.seriesId)
                    .on(model.episode.seasonNr, '!=', raw('0'))
                    .on(model.episode.episodeNr, '!=', raw('0'))
                    .on(model.episode.firstAired, '>=', raw('"' + today + '"'));
            })
            .where(model.follow.userId, '=', userId)
            .where(function() {
                this.where(model.series.status, '=', 'Continuing')
                    .orWhereNotNull(model.episode.episodeNr);
            })
            .groupBy(model.follow.id)
            .orderBy(model.episode.firstAired)
            .limit(limit);
    }

}

UpcomingRepository.inject = [db];

export default UpcomingRepository;
