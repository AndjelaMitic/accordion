var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jsonServer = require("gulp-json-srv");
const { parallel } = require('gulp');
const jsdoc = require('gulp-jsdoc3');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');


function sync(){
  browserSync.init({
      server: './'
  });
}

exports.sync = sync;

// SASS
function scss(cb) {
  return gulp.src(`src/scss/**/*.scss`)
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error',console.error.bind(console))
    .pipe(autoprefixer({
      browsers:['last 2 versions'],
      cascade:false
    }))
    .pipe(rename({suffix:'.min'}))
   .pipe(gulp.dest(`dist/css/`))
   .pipe(browserSync.stream());

   cb();
}

exports.scss = scss;

// JS
function js(cb) {
   return gulp.src(`src/js/**/*.js`)
   .pipe(uglify())
   .pipe(rename({suffix:'.min'}))
   .pipe(gulp.dest(`dist/js/`))
   .pipe(browserSync.stream());

   cb();
}

exports.js = js;


//JSON SERVER
// var server = jsonServer.create();
//
// function json(cb) {
//    return gulp.src(`accordion.json`)
//    .pipe(server.pipe())
//    cb();
// }
//
// exports.json = json;


//JS DOCS
function doc(cb){
  gulp.src('src/js/**/*.js')
  .pipe(jsdoc())
  cb();
}

exports.doc = doc;


// //ES Lint
// function lint(cb){
//   return gulp.src('src/js/**/*.js')
//     // eslint() attaches the lint output to the "eslint" property
//     // of the file object so it can be used by other modules.
//     .pipe(eslint())
//     // eslint.format() outputs the lint results to the console.
//     // Alternatively use eslint.formatEach() (see Docs).
//     .pipe(eslint.format())
//     // To have the process exit with an error code (1) on
//     // lint error, return the stream and pipe to failAfterError last.
//     .pipe(eslint.failAfterError());
//
//   cb();
// }
//
// exports.lint = lint;


//Watcher
function wtc() {
      gulp.watch(['src/scss/**/*.scss'], scss);
     gulp.watch(['src/js/**/*.js'], js);
}

// exports.default = parallel(wtc,json);
exports.default = parallel(sync,wtc);
