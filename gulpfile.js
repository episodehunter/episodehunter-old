'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('watch', ['build:typescript'], function() {
    gulp.watch('src/**/*.ts', ['build:typescript']);
});

gulp.task('build:typescript', function() {
    return gulp.src(['./typings/tsd.d.ts', 'src/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['build:typescript'], function() {
    nodemon({
        script: 'dist/server.js',
        env: {
            NODE_ENV: 'development',
            EH_DB_HOST: 'localhost',
            EH_DB_USER: 'episodehunter',
            EH_DB_PASS: 'episodehunter',
            EH_DB_DB: 'episodehunter',
            EH_DB_PORT: '33060',
            EH_LOG_LEVEL: 'debug',
            RAVEN_DNS: '',
            EH_API_SERVER_PORT: '8000',
            EH_JWT_SALT: 'BY8nAbzP9sCP2y0N!tpjTAjZB39K0E-a'
        },
        ext: 'ts',
        tasks: ['build'],
        nodeArgs: ['--debug']
    })
    .on('restart', function() {
        console.log('restarted!');
    });
});


gulp.task('build', ['build:typescript']);
gulp.task('setup', ['build']);
gulp.task('default', ['build']);
