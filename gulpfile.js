const {src, dest, watch, parallel, series} = require('gulp');

const del = require('del');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');

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
    watch(['app/js/main.js'], scripts)
    watch(['app/scss/*.scss', 'app/components/*.scss'], styles)  
    watch('app/**/*.html', html);
}

// Building
function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html'
    ], {base : 'app'})
        .pipe(dest('dist'))
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
exports.clean = clean;
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.building = building;


// Command: gulp 
// Task for running build and watching changes
exports.default = series(clean, html, parallel(scripts, styles, watchFiles, browserSyncInit));

// Command: gulp build 
// Task building project
exports.build = series(clean, html, scripts, styles);