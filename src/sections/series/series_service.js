/* @flow */
'use strict';

var db = require('../../lib/db');

class ServiesService {

    db: Database;

    constructor(_db: Database) {
        this.db = _db;
    }

    upcoming(userId: number) {

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
                model.series.id,
                model.series.title,
                model.series.poster
            )
            .max(model.episode.seasonNr + ' as season')
            .min(model.episode.episodeNr + ' as episode')
            .min(model.episode.firstAired + ' as first_aired')
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

ServiesService.inject = [db];

export default ServiesService;
