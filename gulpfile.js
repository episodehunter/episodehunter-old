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
        'src/**/*.ts',
        '!src/tests/testdata/*'
    ])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.temp'));
});

gulp.task('build', ['typescript'], () => {
    return gulp.src('.temp/**/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-test-data', function () {
    return gulp
        .src('src/tests/testdata/*.js')
        .pipe(gulp.dest('dist/tests/testdata'));
});

gulp.task('build:watch', ['build'], () => {
    gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('setup', ['build', 'copy-test-data']);
gulp.task('default', ['setup']);
