interface _TvdbShow {
    id: number;
    Actors: string;
    Airs_DayOfWeek: string;
    Airs_Time: string;
    ContentRating: string;
    FirstAired: string;
    Genre: string;
    IMDB_ID: string;
    Language: string;
    Network: string;
    Overview: string;
    Rating: number;
    RatingCount: number;
    Runtime: number;
    SeriesID: number;
    SeriesName: string;
    Status: string;
    added: any;
    addedBy: any;
    banner: string;
    fanart: string;
    lastupdated: number;
    poster: string;
    tms_wanted_old: number;
    zap2it_id: string;
}

interface _TvdbEpisode {
    id: number;
    Combined_episodenumber: number;
    Combined_season: number;
    DVD_chapter: any;
    DVD_discid: any;
    DVD_episodenumber: any;
    DVD_season: any;
    Director: any;
    EpImgFlag: number;
    EpisodeName: string;
    EpisodeNumber: number;
    FirstAired: string;
    GuestStars: string;
    IMDB_ID: string;
    Language: string;
    Overview: string;
    ProductionCode: any;
    Rating: number;
    RatingCount: number;
    SeasonNumber: number;
    Writer: any;
    absolute_number: any;
    airsafter_season: any;
    airsbefore_episode: number;
    airsbefore_season: number;
    filename: string;
    lastupdated: number;
    seasonid: number;
    seriesid: number;
    thumb_added: any;
    thumb_height: number;
    thumb_width: number;
}


interface TvdbShowResponse {
    Series: _TvdbShow;
    Episode: _TvdbEpisode[];
}

export {TvdbShowResponse, _TvdbEpisode};
