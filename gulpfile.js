var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task("watch", function(){
    gulp.watch(['./src/*.js', './main.js'], ['modules']);
});

gulp.task('modules', function() {
    browserify({
        entries: './main.js',
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
});