var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    return gulp.src([
        'src/L.PM.js',
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

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['default']);
});
