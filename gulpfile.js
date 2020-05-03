const gulp = require('gulp'),
    minify = require('gulp-uglify'),
    sass = require('gulp-sass');

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(["src/*.js"])
        .pipe(minify())
        .pipe(gulp.dest("./dist"));
});
gulp.task('sass', function() {
    return gulp.src(["src/*.sass"])
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dist'));
});
gulp.task('default', gulp.series('js', 'sass'));
