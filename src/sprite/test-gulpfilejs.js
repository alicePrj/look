var gulp = require('gulp');
var header = require('gulp-header');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var path = require('path');
var spritesmith = require('gulp.spritesmith');
const del = require('del');

var project_info = {
	dist: 'dist',
	src: 'src'
};

var setting = {
	css: {
		src: project_info.src+'/css',
		dist: project_info.dist+'/css',
	},
	scss: project_info.src+'/scss',
	sourcemaps: project_info.src+'/maps',
	sprites: project_info.src+'/sprites',
	img: {
		src: project_info.src+'/img',
		dist: project_info.dist+'/img'
	},
	js: {
		src: project_info.src+'/js',
		dist: project_info.dist+'/js'
	},
	vendor: {
		src: project_info.src+'/vendor',
		dist: project_info.dist+'/vendor'
	},
	mobile: true,
	sprite_name: 'sp_gfmarket_20160724.png',
	static_server: 'http://static.naver.net/gfmarket/img/common'
};

for (key in setting) {
	project_info[key] = setting[key];
}

var sass_option = {
	outputStyle: 'expanded',
	indentType: 'tab',
	indentWidth: 1
};

var postcss_processors = [
	require('postcss-pxtorem')(),
	require('css-mqpacker')(),
	require('autoprefixer')({browsers: ["Android > 0","iOS > 0","FirefoxAndroid > 0"]})
];

// 기본
gulp.task('default',['dev'],function() {
	gulp.watch(project_info.sprites+'/*.{png,jpg,jpeg}',['sprite']);
	gulp.watch([project_info.scss+'/*.scss',project_info.scss+'/**/*.scss'],['dev']);
});

// 배포
gulp.task('dist',['dev'],function() {
	delete_files('dist');

	gulp.src([project_info.css.src+'/w*.css'])
	.pipe(postcss([require("postcss-url")({
		url: function(data) {
			if(data.indexOf(path.posix.relative(project_info.css.src,project_info.img.src)) == 0)
			{
				return data.replace(path.posix.relative(project_info.css.src,project_info.img.src),project_info.static_server);
			}
		}
	})]))
	.pipe(gulp.dest(project_info.css.dist))
	.pipe(postcss([require('cssnano')({normalizeCharset:false})]))
	.pipe(rename(function(path){
		path.extname = '.min'+path.extname;
	}))
	.pipe(gulp.dest(project_info.css.dist));

	gulp.src([project_info.img.src+'/**/*'],{base: project_info.img.src}).
	pipe(gulp.dest(project_info.img.dist));

	gulp.src([project_info.js.src+'/**/*'],{base: project_info.js.src}).
	pipe(gulp.dest(project_info.js.dist));

	gulp.src([project_info.src+'/*.html',project_info.src+'/templates/*.html'],{base: project_info.src}).
	pipe(gulp.dest(project_info.dist));
});

//개발
gulp.task('dev',['sprite'],function() {
	var stream = gulp.src([project_info.scss+'/*.scss',!project_info.scss+'/_*.scss'])
	.pipe(sass(sass_option))
	.pipe(header('@charset "utf-8";\n\n'))
	.pipe(postcss(postcss_processors))
	.pipe(gulp.dest(project_info.css.src));

	return stream;
});

gulp.task('sprite',function() {
	var sprite_option = {
		imgName: project_info.img.src+'/'+project_info.sprite_name,
		cssName: project_info.scss+'/_sprite.scss',
		imgPath: path.posix.relative(project_info.css.src,project_info.img.src)+'/'+project_info.sprite_name,
		padding: 4,
		cssTemplate: 'scss.handlebars',
		cssOpts: {mobile: project_info.mobile}
	};

	console.log(project_info.img.src, sprite_option.imgName);

	var spriteData = gulp.src(project_info.sprites+'/*.png').pipe(spritesmith(sprite_option));
	return spriteData.pipe(gulp.dest('./'));
});

// 파일 정리
function delete_files(type) {
	var del_info = {
		dev: [],
		dist: [project_info.img.dist+'/*.*',project_info.dist+'/*.*',project_info.css.dist+'/*.*',project_info.js.dist+'/*.*']
	};

	del(del_info[type]);
}
