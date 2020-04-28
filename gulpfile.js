var gulp = require('gulp');
const minify = require('gulp-uglify');

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(["src/*.js"])
        .pipe(minify())
        .pipe(gulp.dest("./dist"));
});
gulp.task('default', gulp.series('js'));
