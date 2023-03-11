const {src, dest, watch, parallel, series} = require('gulp');

const del           = require('del');
const browserSync   = require('browser-sync').create();
const fileInclude   = require('gulp-file-include');
const changed       = require('gulp-changed');
const ttf2woff2     = require('gulp-ttftowoff2');
const fontmin       = require('gulp-fontmin');
const imagemin      = require('gulp-imagemin');
const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');

// Function for cleaning folder dist
function clean() {
    return del(['dist']);
}

// Function for processing HTML files using gulp-file-include.
function html() {
  return src('app/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Function to convert TTF fonts to WOFF and WOFF2 with size minimization
function convertFonts() {
  return src('app/fonts/*.ttf')
    .pipe(fontmin({
      formats: ['woff', 'woff2']
    }))
    .pipe(dest('dist/fonts/'));
}

// Function to convert TTF fonts to WOFF2
function woff2() {
  return src('app/fonts/*.ttf')
    .pipe(changed('dist/fonts/', { extension: '.woff2' }))
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts/'));
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/images'));
}

// Function for monitoring changes in JS files
function scripts() {
  return src(['app/js/*.js', '!app/js/main.min.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Sass
// Sass .pipe(scss({ outputStyle: 'compressed'})) - Compressed
// Sass .pipe(scss()) - NotCompressed 
function styles() {
  return src(['app/scss/*.scss', 'app/components/*.scss'])
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed'})) 
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream());
}

// Function for monitoring changes in files
function watchFiles() {
    watch(['app/fonts/*.ttf'], convertFonts, woff2)
    watch(['app/images/**/*'], images)
    watch(['app/js/main.js'], scripts)
    watch(['app/scss/*.scss', 'app/components/*.scss'], styles) 
    watch('app/**/*.html', html);
}

// Function for browserSync initialization
function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000,
    open: false,
    notify: false
  });
  done();
}

// EXPORTS
exports.clean        = clean;
exports.html         = html;
exports.convertFonts = convertFonts;
exports.woff2        = woff2;
exports.images       = images;
exports.scripts      = scripts;
exports.styles       = styles;


// Command: gulp 
// Task for running build and watching changes
exports.default = series(clean, convertFonts, woff2, html, parallel(images, scripts, styles, watchFiles, browserSyncInit));

// Command: gulp build 
// Task building project
exports.build   = series(clean, convertFonts, woff2, html, images, scripts, styles);