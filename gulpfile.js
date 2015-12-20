var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-minify-css'),
	fileinclude = require('gulp-file-include'),
	svgstore = require('gulp-svgstore'),
	svg2png = require('gulp-svg2png'),
	mainBowerFiles = require('main-bower-files'),
	bowerFiles = mainBowerFiles(),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	modRewrite = require('connect-modrewrite'),
	notify = require('gulp-notify'),
	ghPages = require('gulp-gh-pages'),
	jade = require('gulp-jade'),
	data = require('gulp-data'),
	del = require('del');

console.info('********** Bower Files **********');
console.info(bowerFiles);

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'copyAssets',
	'copyViews',
	'jade',
	'browser-sync',
	'pluginsConcat',
	'jsConcat',
	'less',
	'svgstore',
	'svg2png',
	'watch'
]);

/******************************
 * Build task
 ******************************/
gulp.task('build', [
	'copyAssets',
	'copyViews',
	'jade',
	'pluginsConcat',
	'jsConcat',
	'less-min',
	'svgstore',
	'svg2png'
]);

/******************************
 * Deploy task
 ******************************/
gulp.task('deploy', function(){
	'use strict';
	return gulp.src('public/**/*')
		.pipe(ghPages({
			branch: "gh-pages",
			force: true,
			push: true
		}));
});

/******************************
 * Clean task
 ******************************/
gulp.task('clean', function(){
	return del([
		'public/**/*',
		'.publish/**/*'
	]);
});

/******************************
 * Copy assets to public
 ******************************/
gulp.task('copyAssets', function () {
	'use strict';
	return gulp.src([
			'assets/**/*.*',
			'!assets/**/*.less'
		])
		.pipe(gulp.dest('public'));
});

/******************************
 * SVG stuff
 ******************************/
gulp.task('svgstore', function () {
	'use strict';
	return gulp.src('assets/icons/*.svg')
		.pipe(svgstore())
		.pipe(gulp.dest('public/icons'));
});
gulp.task('svg2png', function () {
	'use strict';
	return gulp.src('assets/icons/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('public/icons'));
});
gulp.task('svg',['svg2png', 'svgstore']);

/******************************
 * Copy views to public
 ******************************/
gulp.task('copyViews', function () {
	'use strict';
	return gulp.src('app/**/*html')
		.pipe(fileinclude())
		.pipe(gulp.dest('public'));
});
gulp.task('jade', function(){
	'use strict';
	return gulp.src('app/**/*jade')
		.pipe(data(function(file){
			return require('./assets/data/views.json');
		}))
		.pipe(jade())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while jading.\nLook in the console for details.\n' + error;
		}))
		.pipe(gulp.dest('public'));
});

/******************************
 * JS plugins
 ******************************/
gulp.task('pluginsConcat', function () {
	bowerFiles.push('./bower_components/svg4everybody/dist/svg4everybody.legacy.min.js');
	return gulp.src(bowerFiles)
		.pipe(concat('plugins.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

/******************************
 * JS concat
 ******************************/
gulp.task('jsConcat', function () {
	return gulp.src(['app/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		// .pipe(uglify())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while uglifying js.\nLook in the console for details.\n' + error;
		}))
		.pipe(sourcemaps.write('../js'))
		.pipe(gulp.dest('public/js'));
});

/******************************
 * Browser sync
 ******************************/
gulp.task('browser-sync', function () {
	var files = [
		'public/**/*.html',
		'public/js/**/*.js',
		'public/css/*.css'
	];

	browserSync.init(files, {
		server: {
			baseDir: './public',
			middleware: [
				modRewrite([
					'^[^\\.]+$ /index.html [L]'
				])
			]
		},
		open: false
	});
});

/******************************
 * Watch
 ******************************/
gulp.task('watch', function () {
	gulp.watch('assets/less/*.less', ['less']);
	gulp.watch('app/**/*.js', ['jsConcat']);
	gulp.watch('app/**/*.html', ['copyViews']);
	gulp.watch('app/**/*.jade', ['jade']);
	gulp.watch(['assets/**/*.*', '!assets/less/*.less'], ['copyAssets']);
});

/******************************
 * Less
 ******************************/
gulp.task('less', function () {
	return gulp.src('assets/less/app.less')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('public/css'));
});

/******************************
 * Less min
 ******************************/
gulp.task('less-min', function () {
	return gulp.src('assets/less/app.less')
		.pipe(plumber())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(minifyCSS({
			keepBreaks: false,
			keepSpecialComments: true,
			benchmark: false,
			debug: true
		}))
		.pipe(gulp.dest('public/css'));
});