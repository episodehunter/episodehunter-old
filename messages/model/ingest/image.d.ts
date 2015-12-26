declare module 'eh-domain/model/ingest/image' {
    import {MovieIds, ShowIds, EpisodeIds} from 'eh-domain/model/ids';

    export interface MovieImageJob {
        ids: MovieIds;
        fileName: string;
    }

    export interface ShowImageJob {
        ids: ShowIds;
        fileName: string;
    }

    export interface EpisodeImageJob {
        ids: EpisodeIds;
        fileName: string;
    }

}
