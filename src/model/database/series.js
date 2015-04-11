var seriesModel = {
    id: 'tv_show.id',
    tvdbId: 'tv_show.tvdb_id',
    imdbId: 'tv_show.imdb_id',
    title: 'tv_show.name',
    airs: {
        dayOfWeek: 'tv_show.airs_dayOfWeek',
        time: 'tv_show.airs_time'
    },
    genre: 'tv_show.genre',
    language: 'tv_show.language',
    network: 'tv_show.network',
    overview: 'tv_show.overview',
    runtime: 'tv_show.runtime',
    status: 'tv_show.status',
    fanart: 'tv_show.fanart',
    poster: 'tv_show.poster',
    lastupdate: 'tv_show.lastupdate'
};

seriesModel.$table = 'tv_show';

module.exports = seriesModel;
