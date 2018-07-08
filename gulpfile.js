var baseJsUrl = './src/dev-js/';
var gulp = require('gulp');

//for core use
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

//for css use
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

//js
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var concat = require('gulp-concat');

gulp.task('default', function () {
    // place code for your default task here
});


gulp.task('watch', function () {
    gulp.watch('./scss/*/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['preparejs', 'babel']);
});

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('babel', ['preparejs'], function () {
    return gulp.src('./src/production.js')
        .pipe(babel())
        .pipe(rename('main.js'))
        .pipe(gulp.dest('./js/'));
});

gulp.task('preparejs', function () {
    var scripts = [
        './js/assets/jquery.min.js',
        './js/assets/bootstrap.min.js',
        './js/assets/owl-carousel.min.js',
    ];

    return gulp.src(scripts)
        .pipe(concat('assets.js'))
        .pipe(gulp.dest('./js/'));
});

gulp.task('uglify', function () {
    gulp.src('./js/main.js')
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./js/'))
});

gulp.task('postcss', function () {
    var processors = [
        autoprefixer({
            browsers: ['>1%', 'last 2 versions', 'ie >= 9'],
            cascade: false
        }),
        cssnano({
            discardComments: {
                removeAll: true
            },
            zindex: false,
            autoprefixer: false
        }),
    ];

    gulp.src('./css/theme.css')
        .pipe(postcss(processors))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./css'))
});