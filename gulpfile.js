const gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync').create();

gulp.task('less', function () {
    return gulp.src('./app/src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./app/dist/css'));
});
gulp.task('js', function () {
    return gulp.src('./app/src/js/**/*.js')
        .pipe(less({
            paths: [path.join(__dirname, 'js', 'includes')]
        }))
        .pipe(gulp.dest('./app/dist/js'));
});
gulp.task('watch less', function(){
    gulp.watch('./app/src/less/**/*.less', gulp.series('less'));
    // Другие отслеживания
})
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('default',  gulp.parallel('browserSync','watch less'),);
