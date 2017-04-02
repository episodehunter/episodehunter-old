import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tv_watched')
export class TvWatched {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {length: 11})
    user_id: number;

    @Column('int', { length: 10 })
    serie_id: number;

    @Column('int', { length: 2 })
    season: number;

    @Column('int', { length: 3 })
    episode: number;

    @Column('int', { length: 10 })
    time: number;

    @Column('int', { length: 1 })
    type: number;
}
