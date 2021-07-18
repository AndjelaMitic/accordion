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
var server = jsonServer.create({
  port: 25000,
});

function json(cb) {
   return gulp.src(`accordion.json`)
   .pipe(server.pipe())
   cb();
}

exports.json = json;


//JS DOCS
function doc(cb){
  gulp.src('src/js/**/*.js')
  .pipe(jsdoc())
  cb();
}

exports.doc = doc;


//ES Lint
function lint(cb){
  return gulp.src('src/js/**/*.js')
    .pipe(eslint({
    'rules':{
        'eqeqeq': 'off',
        'quotes': [1, 'single'],
        'semi': [1, 'always']
    },
    'env': {
      'es6': true
     },
    'parserOptions': {
        'ecmaVersion': 6
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

  cb();
}

exports.lint = lint;


//Watcher
function wtc() {
      gulp.watch(['src/scss/**/*.scss'], scss);
     gulp.watch(['src/js/**/*.js'], js);
}

exports.default = parallel(sync,wtc,json);
