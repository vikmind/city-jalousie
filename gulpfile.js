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
	notify = require('gulp-notify');

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'copyAssets',
	'copyViews',
	'pluginsConcat',
	'jsConcat',
	'less',
	'svg',
	'browser-sync',
	'watch'
]);

/******************************
 * Build task
 ******************************/
gulp.task('build', [
	'copyAssets',
	'copyViews',
	'pluginsConcat',
	'jsConcat',
	'less-min',
	'svg'
]);

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
gulp.task('svg', ['svgstore'/*, 'svg2png'*/]);

/******************************
 * Copy views to public
 ******************************/
gulp.task('copyViews', function () {
	'use strict';
	return gulp.src('app/**/*html')
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest('public'));
});

/******************************
 * JS plugins
 ******************************/
var firstTime = true;
gulp.task('pluginsConcat', function () {
	bowerFiles.push('./bower_components/svg4everybody/dist/svg4everybody.legacy.min.js');
	if (firstTime){
		console.info('********** Bower Files **********');
		console.info(bowerFiles);
		firstTime = false;
	}
	return gulp.src(bowerFiles)
		.pipe(concat('plugins.min.js'))
		.pipe(uglify({
			mangle: false
		}))
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
		.pipe(uglify({
			mangle: false
		}))
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
				function(req, res, next){
					if (req.method == 'POST') {
						res.setHeader('Location', req.url);
						res.statusCode = 303;
						res.end('');
					} else {
						next();
					}
				},
				modRewrite([
					'^[^\\.]*$ /index.html [L]'
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