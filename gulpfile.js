'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

let tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('typescript', () =>  {
    return gulp.src([
        'src/typings/typings.d.ts',
        'src/**/*.ts'
    ])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.tmp'));
});

gulp.task('build', ['typescript'], () => {
    return gulp.src('.tmp/**/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
