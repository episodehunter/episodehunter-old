export interface Show {
    id?: number;
    tvdb_id: number;
    imdb_id: string;
    name: string;
    airs_dayOfWeek: string; // TODO: Rename
    airs_time: string;
    first_aired: string;
    genre: string;
    language: string;
    network: string;
    overview: string;
    runtime: number;
    status: string;
    fanart: string;
    poster: string;
    lastupdate: number;
};

export const showTable = {
    id: 'tv_show.id',
    tvdb_id: 'tv_show.tvdb_id',
    imdb_id: 'tv_show.imdb_id',
    name: 'tv_show.name',
    airs_dayOfWeek: 'airs_dayOfWeek', // TODO: Rename
    airs_time: 'tv_show.airs_time',
    first_aired: 'tv_show.first_aired',
    genre: 'tv_show.genre',
    language: 'tv_show.language',
    network: 'tv_show.network',
    overview: 'tv_show.overview',
    runtime: 'tv_show.runtime',
    status: 'tv_show.status',
    fanart: 'tv_show.fanart',
    poster: 'tv_show.poster',
    lastupdate: 'tv_show.lastupdate',

    $table: 'tv_show'
};
