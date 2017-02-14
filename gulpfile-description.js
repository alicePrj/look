'use strict';

//Modules 호출


const fs = require('fs');
const path = require('path');
const gulp = require('gulp');// gulp 모듈 호출
//const browserSync = require('browser-sync');
const del = require('del');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');


// default는 command-line에서 아무런 argument없이 gulp를 실행했을대 기본 값으로 실행되는 task.
// Gulp.task() 를 사용해 기본(Default) 테스크를 정의
gulp.task('default', ['watch','sass']);

//기본 task 설정
// gulp.task('default', [
// 	'server', 'combine-js',
// 	'compile-sass', 'compress-html',
// 	'watch' ]);



var paths = {
  css_src: 'src/scss/',
  css_dest: 'src/css/',
  img_dest: 'src/img/',
};



gulp.task('sass', function() {
	return gulp.src(path.join(paths.css_src, '**/*.scss'))
			.pipe(sourcemaps.init())
			.pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.css_dest));
});




gulp.task('watch', function () {
	var options = {};
	gulp.watch([path.join(paths.css_src, '/**/*')], ['sass']);
});
