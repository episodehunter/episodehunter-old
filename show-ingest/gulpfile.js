'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

let tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('build', () =>  {
    return gulp.src([
        'src/episodehunter-messages/**/*.d.ts',
        'src/typings/typings.d.ts',
        'src/**/*.ts'
    ])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(babel({
            plugins: [
                'transform-es2015-parameters',
                'transform-es2015-destructuring'
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-test-data', function () {
    return gulp
        .src('tests/testdata/*.js')
        .pipe(gulp.dest('dist/tests/testdata'));
});

gulp.task('build:watch', ['build'], () => {
    gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('setup', ['build', 'copy-test-data']);
gulp.task('default', ['setup']);
