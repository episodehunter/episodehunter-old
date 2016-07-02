export interface Episode {
    id?: number;
    tvdb_id: number;
    serie_tvdb_id: number;
    serie_id: number;
    name: string;
    season: number;
    episode: number;
    first_aired: string;
    overview: string;
    image: string;
    lastupdated: number;
}

export const episodeTabel = {
    id: 'tv_episode.id',
    tvdb_id: 'tv_episode.tvdb_id',
    serie_tvdb_id: 'tv_episode.serie_tvdb_id', // TODO: Rename
    serie_id: 'tv_episode.serie_id',           // TODO: Rename
    name: 'tv_episode.name',
    season: 'tv_episode.season',
    episode: 'tv_episode.episode',
    first_aired: 'tv_episode.first_aired',
    overview: 'tv_episode.overview',
    image: 'tv_episode.image',
    lastupdated: 'tv_episode.lastupdated',

    $table: 'tv_episode'
};
