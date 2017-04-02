import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tv_show')
export class Show {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {length: 7})
    tvdb_id: number;

    @Column('string', { length: 10 })
    imdb_id: string;

    @Column('string', { length: 255 })
    name: string;

    @Column('string', { length: 9 })
    airs_dayOfWeek: string;

    @Column('string', { length: 8 })
    airs_time: string;

    @Column('string', { length: 10 })
    first_aired: string;

    @Column('string', { length: 255 })
    genre: string;

    @Column('string', { length: 2 })
    language: string;

    @Column('string', { length: 20 })
    network: string;

    @Column('text')
    overview: string;

    @Column('int', { length: 3 })
    runtime: string;

    @Column('string', { length: 10 })
    status: string;

    @Column('string', { length: 50 })
    fanart: string;

    @Column('string', { length: 50 })
    poster: string;

    @Column('int', { length: 10 })
    lastupdate: number;
}
