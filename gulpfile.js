var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');


gulp.task('scripts', function() {
    return gulp.src([
        'src/js/L.PM.js',
        'src/**/*.js'
    ])

    // Compine all js files into one file
    .pipe(concat('leaflet.pm.js'))

    // Output the non-minified version
    .pipe(gulp.dest('dist/'))

    // minify
    .pipe(uglify())

    // rename
    .pipe(rename({ extname: '.min.js' }))

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

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('build', ['scripts', 'styles']);
gulp.task('default', ['build']);
