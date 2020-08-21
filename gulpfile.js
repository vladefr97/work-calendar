const gulp = require('gulp') ;
const less = require('gulp-less');
const uglifycss = require('gulp-uglifycss');
const path = require('path');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');



gulp.task('less', function () {
    return gulp.src('./app/src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./app/dist/css'))
    // .pipe(gulpIf('*.css', uglify()));
    // .pipe(autoprefixer());
});
gulp.task('prefix', function () {
    return gulp.src('./app/dist/*.css')
        .pipe(autoprefixer({
            ovverideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/dist/css'))
});

gulp.task('js', function () {
    return gulp.src('./app/src/js/**/*.js')
        .pipe(less({
            paths: [path.join(__dirname, 'js', 'includes')]
        }))
        .pipe(gulp.dest('./app/dist/js'));
});
gulp.task('watch less', function () {
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

gulp.task('default', gulp.parallel('browserSync'),);
