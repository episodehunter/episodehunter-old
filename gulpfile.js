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
        .pipe(gulp.dest('dest'));
});

gulp.task('serve', ['build:typescript'], function() {
    nodemon({
        script: 'dest/server.js',
        env: { 'NODE_ENV': 'development' },
        ext: 'ts',
        tasks: ['build'],
        nodeArgs: ['--debug']
    })
    .on('restart', function() {
        console.log('restarted!');
    });
});


gulp.task('build', ['build:typescript']);
gulp.task('default', ['build']);
