var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/L.PM.js',
        'src/js/L.PM.Map.js',
        'src/js/Draw/L.PM.Draw.js',
        'src/js/Edit/L.PM.Edit.js',
        'src/js/**/*.js'
    ])

    // init sourcemaps
    .pipe(sourcemaps.init())


    // parse es6
    .pipe(babel({
        presets: ['es2015']
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
    .pipe(gulp.dest('dist/'));
});

gulp.task('styles', function() {
    return gulp.src([
        'src/css/**/*.css'
    ])
    .pipe(concatCss('leaflet.pm.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('assets', function() {
    return gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('dist/assets/'))
    .pipe(gulp.dest('demo/assets/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('build', ['scripts', 'styles', 'assets']);
gulp.task('default', ['build']);
