import { test } from 'ava';
import { Episode, episodeTabel, Show, showTable, FollowingShow, followingShowTable } from '../../../contracts/database';
import { UpcomingEpisode } from '../../../sections/user/upcoming/model/upcomping-model';
import { db } from '../../../lib/db';
import { request } from '../server';

const SHOW_ID = {
    GameOfThrones: 1,
    Dexter: 2,
};

const theDayAfterTomorrow = (t = new Date()) => new Date(t.setDate(t.getDate() + 2)).toISOString().slice(0, 10);
const nextWeek = (t = new Date()) => new Date(t.setDate(t.getDate() + 7)).toISOString().slice(0, 10);
const lastWeek = (t = new Date()) => new Date(t.setDate(t.getDate() - 7)).toISOString().slice(0, 10);
const createShow = id => {
    return {
        id,
        tvdb_id: 1,
        imdb_id: '',
        name: 'Game of Thrones',
        airs_dayOfWeek: 'Mondays',
        airs_time: '09:00 pm',
        first_aired: '2010-03-31',
        genre: 'Drama',
        language: 'en',
        network: 'HBO',
        overview: '',
        runtime: 60,
        status: 'Continuing',
        fanart: '',
        poster: '',
        lastupdate: 0
    };
};
const defaultEpisode: Episode = {
    id: 1,
    tvdb_id: 1,
    serie_tvdb_id: 1,
    serie_id: SHOW_ID.GameOfThrones,
    name: '',
    season: 1,
    episode: 8,
    first_aired: '',
    overview: '',
    image: '',
    lastupdated: 0
};

test.before(async (t) => {
    const shows: Show[] = [createShow(SHOW_ID.GameOfThrones), createShow(SHOW_ID.Dexter)];
    const followingShows: FollowingShow[] = [
        { user_id: 2, show_id: SHOW_ID.GameOfThrones },
        { user_id: 2, show_id: SHOW_ID.Dexter }
    ];
    await db.table(showTable.$table).truncate();
    await db.table(showTable.$table).insert(shows);
    await db.table(followingShowTable.$table).truncate();
    await db.table(followingShowTable.$table).insert(followingShows);
});

test('should return one upcoming episode', async (t) => {
    // Arrange
    const episode: Episode = {
        id: 1,
        tvdb_id: 3254641,
        serie_tvdb_id: 121361,
        serie_id: SHOW_ID.GameOfThrones,
        name: 'Winter Is Coming',
        season: 1,
        episode: 10,
        first_aired: '2016-07-05',
        overview: '',
        image: '',
        lastupdated: 0
    };
    await db.table(episodeTabel.$table).truncate();
    await db.table(episodeTabel.$table).insert(episode);

    // Act
    const response = await request.get<{episodes: UpcomingEpisode[]}>('/user/upcoming/episodes');

    // Assert
    const statusCode = response.statusCode;
    const episodes = response.result.episodes;

    t.is(statusCode, 200);
    t.is(episodes.length, 1);
    t.deepEqual(episodes[0], {
        ids: {
            id: 1
        },
        title: 'Winter Is Coming',
        season: 1,
        episode: 10,
        airs: '2016-07-05',
        thumbnail: undefined,
        show: {
            ids: {
                id: SHOW_ID.GameOfThrones
            },
            title: 'Game of Thrones',
            year: 2010,
            poster: '',
            fanart: ''
        }
    });
});

test('should only return the next upcoming episode', async (t) => {
    // Arrange
    const episodes: Episode[] = [
        Object.assign({}, defaultEpisode, {
            id: 1,
            serie_id: SHOW_ID.GameOfThrones,
            season: 1,
            episode: 8,
            first_aired: lastWeek(),
        }),
        Object.assign({}, defaultEpisode, {
            id: 2,
            serie_id: SHOW_ID.GameOfThrones,
            season: 1,
            episode: 9,
            first_aired: theDayAfterTomorrow(),
        }),
        Object.assign({}, defaultEpisode, {
            id: 3,
            serie_id: SHOW_ID.GameOfThrones,
            season: 1,
            episode: 10,
            first_aired: nextWeek(),
        })
    ];
    await db.table(episodeTabel.$table).truncate();
    await db.table(episodeTabel.$table).insert(episodes);

    // Act
    const response = await request.get<{episodes: UpcomingEpisode[]}>('/user/upcoming/episodes');

    // Assert
    const episodesResult = response.result.episodes;

    t.is(episodesResult.length, 1);
    t.is(episodesResult[0].ids.id, 2);
});

test('should return the next upcoming episode for two shows', async (t) => {
    // Arrange
    const episodes: Episode[] = [
        Object.assign({}, defaultEpisode, {
            id: 1,
            serie_id: SHOW_ID.GameOfThrones,
            season: 1,
            episode: 8,
            first_aired: theDayAfterTomorrow(),
        }),
        Object.assign({}, defaultEpisode, {
            id: 3,
            serie_id: SHOW_ID.Dexter,
            season: 1,
            episode: 10,
            first_aired: nextWeek(),
        })
    ];
    await db.table(episodeTabel.$table).truncate();
    await db.table(episodeTabel.$table).insert(episodes);

    // Act
    const response = await request.get<{episodes: UpcomingEpisode[]}>('/user/upcoming/episodes');

    // Assert
    const episodesResult = response.result.episodes;

    t.is(episodesResult.length, 2);
});
