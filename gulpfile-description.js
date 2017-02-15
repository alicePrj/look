'use strict';


// npm 호출

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const livereload  = require('gulp-livereload');


// var paths = {
//   css_src: 'src/scss/',
//   css_dest: 'src/css/',
//   img_dest: 'src/img/',
// };



// 경로 변수 ,객체 생성.
var src = 'src';
//var dist = 'src';
var paths = {
  js : src + '/js/**/*.js',
  scss : src + '/scss/**/*.scss'
};


//scss config 설정
/**  outputStyle - CSS의 컴파일 결과 코드스타일 지정
  indentType  -  컴파일 된 CSS의 "들여쓰기" 의 타입
  indentWidth - 컴파일 된 CSS의 "들여쓰기" 의 갯수
  precision - 컴파일 된 CSS 의 소수점 자리수.
  sourceComments - 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시.
  자세한 옵션 참조 : https://github.com/floridoo/gulp-sourcemaps#init-options
*/
var scssOptions = {
  outputStyle : "expanded",
  indentType : "tab",
  indentWidth : 1,
  precision: 6,
  sourceComments: false
  //sourceComments: true
};



gulp.task('scss:compile', function () {
   return gulp // SCSS 파일을 읽어온다.
    .src(paths.scss)
    .pipe(sourcemaps.init())// 소스맵 초기화(소스맵을 생성)
    .pipe(sass(scssOptions).on('error', sass.logError)) // SCSS 함수에 옵션갑을 설정, SCSS 작성시 watch 가 멈추지 않도록 logError 를 설정
    .pipe(sourcemaps.write('./')) // 위에서 생성한 소스맵을 사용한다.
    .pipe(gulp.dest(src + '/css')) // 목적지(destination)을 설정
});


gulp.task('watch', function () {
    gulp.watch(paths.scss, ['scss:compile']);
});

//gulp.task  기본(defaul)로 scss:compile 과 watch 설정.
gulp.task('default', ['scss:compile','watch']);
