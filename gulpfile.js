'use strict';

const gulp = require('gulp');
const path = require('path');
const lazypipe = require('lazypipe');
const sass = require('gulp-sass');

var spritesmith = require('gulp.spritesmith');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const gulpif = require('gulp-if');

const notify = require("gulp-notify");
const plumber = require('gulp-plumber');

// var paths = {
//   css_src: 'src/scss/',
//   css_dest: 'src/css/',
//   img_dest: 'src/img/',
// };


var src = 'src';
//var dist = 'src';
var paths = {
  js : src + '/js/**/*.js',
  scss : src + '/scss/**/*.scss'
};

var config ={
  browserSync: false,
  notify: true,
  urlRebase: false
}


var scssOptions = {
  //outputStyle : "expanded",
  outputStyle : "compact",
  indentType : "tab",
  indentWidth : 1,
  precision: 6
 // sourceComments: false;
  //sourceComments: true
};


// gulp.task('html', function () {
//   return gulp.src('./**/*.html')
// .pipe(browserSync.reload({
//   stream : true
// }));
//
// });


var globalOptions = {
	notify: !config.notify ? {} : {
		errorHandler: notify.onError({
			title: '<%= error.relativePath %>',
			message: '<%= error.line %> line - <%= error.messageOriginal %>',
			sound: "Pop"
		})
	}
}


gulp.task('scss:compile', function () {
   return gulp
    .src(paths.scss)
    .pipe(plumber(globalOptions.notify))
    .pipe(sourcemaps.init())
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(src + '/css'))
    .pipe(browserSync.reload({
       stream : true
    }));

});

gulp.task('browserSync', [ 'scss:compile'], function () {
   return browserSync.init({
     port : 3333,
     server: {
       baseDir: "./src"
     }
   });
 });
''
gulp.task('watch', function () {
  gulp.watch('./**/*.html', ['html']);
  gulp.watch(paths.scss, ['scss:compile']);
});


gulp.task('default', ['browserSync','watch']);
