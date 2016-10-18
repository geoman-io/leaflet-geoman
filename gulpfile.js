/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concatCss = require('gulp-concat-css');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', () =>
    gulp.src([
        'src/js/Mixins/**.js',
        'src/js/L.PM.js',
        'src/js/L.PM.Map.js',
        'src/js/Draw/L.PM.Draw.js',
        'src/js/Edit/L.PM.Edit.js',
        'src/js/**/*.js',
    ])

    // init sourcemaps
    .pipe(sourcemaps.init())


    // parse es6
    .pipe(babel({
        presets: ['es2015'],
    }))

    // Compine all js files into one file
    .pipe(concat('leaflet.pm.js'))

    // minify
    .pipe(uglify())

    // rename
    .pipe(rename({ extname: '.min.js' }))

    // write sourcemaps
    .pipe(sourcemaps.write('maps'))

    // output the minified file
    .pipe(gulp.dest('dist/'))
);

gulp.task('styles', () =>
    gulp.src([
        'src/css/**/*.css',
    ])
    .pipe(concatCss('leaflet.pm.css'))
    .pipe(gulp.dest('dist/'))
);

gulp.task('assets', () =>
    gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('dist/assets/'))
    .pipe(gulp.dest('demo/assets/'))
);

gulp.task('watch', () => {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('build', ['scripts', 'styles', 'assets']);
gulp.task('default', ['build']);
