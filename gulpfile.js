'use strict';

var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var dateFormat = require('dateformat');

gulp.task('clean', function() {
    return del([
        // './src/js',
        './dist'
    ]);
});

gulp.task('less', function() {
    return gulp.src('src/client/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/client'))
        .pipe(livereload());
});

gulp.task('usemin', function() {
    return gulp.src([ 'src/index.html' ])
        .pipe(usemin({
            css: [ rev ],
            js: [ uglify, rev ],
            inlinejs: [ uglify ]
            //, html: [ minifyHtml({ empty: true }) ]
        }))
        .pipe(replace('<%=build.date%>',
            dateFormat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('cssnano', function() {
    return gulp.src('src/client/all.css')
        .pipe(concatCss('all.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/client/'));
});

gulp.task('jshint', function() {
    return gulp.src([ 'src/**/*.js', '!src/bower_components/**/*.js' ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});
gulp.task('-jshint-without-failing', function() {
    return gulp.src([ 'src/**/*.js', '!src/bower_components/**/*.js' ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// TODO: This currently is wrong!
gulp.task('copy-non-minified-files', function() {
    // It was tricky here to get the relative paths preserved...
    return gulp.src([ 'src/.htaccess', 'src/data/**' ])
        .pipe(gulp.dest(function(file) {
            return file.base.replace(/([\\/])src([\\/])/, '$1dist$2');
        }));
});

gulp.task('-live-reload-markup', function() {
    gulp.src([ 'src/*.html' ])
    // .pipe(gulp.dest('src/js/'))
        .pipe(livereload({ quiet: true }));
});
gulp.task('-live-reload-source', function() {
    gulp.src([ 'src/*.js', 'src/client/**/*.jsx' ])
        .pipe(livereload({ quiet: true }));
});
gulp.task('watch', [ 'less' ], function() {
    livereload.listen();
    gulp.watch('src/client/*.less', [ 'less' ]);
    gulp.watch('src/*.html', [ '-live-reload-markup' ]);
    gulp.watch([ 'src/*.js', 'src/client/**/*.jsx' ], [ '-live-reload-source' ]);
});

gulp.task('default', function() {
    runSequence('less', 'clean', 'jshint', 'usemin', 'cssnano', 'copy-non-minified-files');
});
