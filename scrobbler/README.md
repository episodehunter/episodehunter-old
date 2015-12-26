# Episodehunter scrobble

> Scrobble service for episodehunter.tv

This is part of an ongoing project to rewrite episodehunter.tv to an node.js project.
Parallel to this project, there is an ongoing project to rewrite the front end part of episodehunter [here](https://github.com/tjoskar/episodehunter.tv).

This module is responsible for users watch-status on movies and TV episodes.

When a user marks a movie (or TV episode) as watched in a client (eg. web, kodi, plex etc.) a
request will go off to the web-API which will redirect the request to this service.

## Requirement
- Node >= 4.0
- Typescript >= 1.7.3
- MySQL >= 5.6 ([setup](https://github.com/tjoskar/episodehunter-api))
- Redis >= 3.0 ([setup](https://github.com/tjoskar/episodehunter-api))

## Install
```
$ npm run setup
```

## Usage
#### Start
```
$ npm start
```

#### Test
```
$ npm test
$ npm run test:integration
$ npm run test:all
```
