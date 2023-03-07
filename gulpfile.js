const {src, dest, watch, parallel, series} = require('gulp');

const fileInclude = require('gulp-file-include');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

// FUNCTIONS
function scripts() {
    return src(['app/js/*.js', '!app/js/main.min.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function styles() {
    return src(['app/scss/*.scss', 'app/components/*.scss'])
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed'})) 
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['app/js/main.js'], scripts)
    watch(['app/scss/*.scss', 'app/components/*.scss'], styles)
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist(){
    return src('dist')
    .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html'
    ], {base : 'app'})
        .pipe(dest('dist'))
}

// EXPORTS
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.building = building;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, browsersync, watching);
