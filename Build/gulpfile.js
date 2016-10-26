var autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    batch = require('gulp-batch'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');


gulp.task('lint:sass', function () {
    gulp.src([
        '../Resources/Private/Styles/**/*.scss'
    ]).pipe(scsslint({'config': './.scss-lint-config.yml'}));
});

gulp.task('compile:sass', function () {
    gulp.src('../Resources/Private/Styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../Resources/Public/Styles'));
});

gulp.task('watch', function () {
    gulp.watch('../Resources/Private/Styles/**/*.scss', batch(function (events, done) {
        gutil.log(gutil.colors.green('SCSS changes detected'));
        events.on('data', function (list) {
            gutil.log(gutil.colors.green('Changed file:'), list.path);
        });
        runSequence('lint:sass', 'compile:sass', done);
    }));
});