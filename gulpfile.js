/* jshint node:true */
'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    fileinclude = require('gulp-file-include'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    runTimestamp = Math.round(Date.now() / 1000);

// Definitions
var source = {
    js: [
        "src/assets/js/script.js",
        "src/assets/js/jquery-3.3.1.min.js"
    ]
};

// Tasks
// Webserver
gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            open: '/dist',
            livereload: true,
            directoryListing: true,
            fallback: 'index.html'
        }));
});

// File include
gulp.task('fileinclude', function () {
    gulp.src(['src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/html/'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload({ start: true }));
});

// Styles
gulp.task('sass', function () {
    gulp.src('src/assets/scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(livereload({ start: true }));
});

// Scripts
gulp.task('scripts', function () {
    gulp.src(source.js)
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(livereload({ start: true }));
});

// Fonts
gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/*')
        .pipe(gulp.dest('dist/assets/fonts'));
});


// images
gulp.task('images', function () {
    return gulp.src('src/assets/img/*')
        .pipe(gulp.dest('dist/assets/img/'));
});

// Watch
gulp.task('watch', function () {
    gulp.watch(['src/assets/scss/*.scss'], ['sass']);
    gulp.watch(['src/assets/js/*.js'], ['scripts']);
    gulp.watch(['src/html/**/*.html'], ['fileinclude']);
    gulp.watch(['src/assets/fonts/*.*'], ['fonts']);
    gulp.watch(['src/assets/img/**/*'], ['images']);
});


// Default task
gulp.task('default', ['sass', 'scripts', 'fonts', 'fileinclude', 'images', 'webserver', 'watch']);
