const {
	src,
	dest,
	series,
	parallel,
	watch
} = require('gulp');
const pug = require('gulp-pug');
const formatHtml = require('gulp-format-html');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const webpackStream = require('webpack-stream');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');

const path = {
	markup: {
		whatch: './src/layout/**/*.pug',
		compile: './src/layout/pages/*.pug',
		result: './app/'
	},
	styles: {
		whatch: './src/layout/**/*.{scss,sass}',
		compile: './src/layout/common/*.{scss,sass}',
		result: './app/css/',
		libs: [
			'./src/assets/libs/swiper/swiper-bundle.min.css'
		]
	},
	scripts: {
		jsWhatch: './src/layout/**/*.js',
		jsCompile: './src/layout/common/*.js',
		result: './app/js/',
		libs: [
			'./src/assets/libs/swiper/swiper-bundle.min.js'
		]
	},
	images: {
		source: './src/layout/**/*.{jpg,jpeg,png,gif}',
		svgSource: './src/layout/common/img/icons/svg/*.svg',
		pngSource: './src/layout/common/img/icons/png/*.png',
		pngSource2x: './src/layout/common/img/icons/png/*@2x.png',
		result: './app/',
	},
	fonts: {
		source: './src/assets/fonts/**/*',
		result: './app/fonts/',
		css: './app/fonts/'
	},
	files: {
		source: './src/assets/files/*',
		result: './app/files/',
	},
	favicon: {
		source: './src/assets/favicon/*',
		result: './app/favicon/',
	},
	dirs: {
		src: './src/',
		app: './app/**/*',
		prod: './prod/'
	}
}

// tasks options
var cleanCSSOptions = {
	compatibility: 'ie10',
	format: 'beautify',
	level: { 0: { specialComments: 0 } }
}
var gulpSassOptions = {
	outputStyle: 'expanded',
	sourceComments: true
}
var pngSpriteOptions = {
	imgName: 'pngsprite.png',
	imgPath: '../img/sprite/pngsprite.png',
	cssName: 'pngsprite.css',

	retinaSrcFilter: path.images.pngSource2x,
	retinaImgName: 'pngsprite@2x.png',
	retinaImgPath: '../img/sprite/pngsprite@2x.png',

	padding: 5
}
var imageminOptions = {
	iterlaced: true
}

// Clear app
const clearApp = () => {
	return del(path.dirs.app)
}
exports.clearapp = clearApp;

// Clear prod directory
const clearProd = () => {
	return del(path.dirs.prod)
}
exports.clearprod = clearProd;

// Clear cache
const clearCache = () => {
	return cache.clearAll();
}
exports.clearcache = clearCache;

// Compile pug to html
const markupCompiller = () => {
	return src(path.markup.compile) // find pug
		.pipe(pug()) // compile to html
		.pipe(formatHtml()) // make html beautiful
		.pipe(dest(path.markup.result)) // paste html
		.pipe(browserSync.stream()); // reload browser
}
exports.markupcompiller = markupCompiller; // start task

// Compile scss/sass to css
const styleCompiller = () => {
	return src(path.styles.compile) // find styles
		.pipe(sourcemaps.init()) // start making styles map
		.pipe(sass(gulpSassOptions).on('error', notify.onError())) // compile to css and show errors
		.pipe(autoprefixer()) // add prefixes
		.pipe(cleanCSS(cleanCSSOptions)) // remove garbage from css
		.pipe(sourcemaps.write('.')) // finish making styles map
		.pipe(dest(path.styles.result)) // output css
		.pipe(browserSync.stream()) // reload browser
}
exports.stylecompiller = styleCompiller;

// Concat css libs
const cssLibs = () => {
	return src(path.styles.libs)
		.pipe(concat('libs.css'), {
			allowEmpty: true
		})
		.pipe(cleanCSS(cleanCSSOptions))
		.pipe(dest(path.styles.result))
		.pipe(browserSync.stream())
}
exports.csslibs = cssLibs;

// Compile js
const jsCompiller = () => {
	return src(path.scripts.jsCompile)
		.pipe(webpackStream({
			output: {
				filename: 'common.min.js'
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /node_modules|bower_components/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									targets: "defaults"
								}]
							]
						}
					}
				}]
			}
		}))
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest(path.scripts.result))
		.pipe(browserSync.stream())
}
exports.jscompiller = jsCompiller;

// Concat js libs
const jsLibs = () => {
	return src(path.scripts.libs)
		.pipe(concat('libs.min.js'), {
			allowEmpty: true
		})
		.pipe(uglify())
		.pipe(dest(path.scripts.result))
		.pipe(browserSync.stream())
}
exports.jslibs = jsLibs;

// Transfer images
const transferImg = () => {
	return src(path.images.source) // get images
	.pipe(cache(imagemin(imageminOptions))) // generate images cache and minify them
	.pipe(rename(function (path) { // change path
		path.dirname = "img/";
	}))
	.pipe(dest(path.images.result)) // paste images
}
exports.transferimg = transferImg;

// Generate webp
const generateWebp = () => {
	return src(path.images.source) // get images
	.pipe(rename(function (path) { // change path
		path.dirname = "img/webp/";
	}))
	.pipe(webp()) // generate webp format
	.pipe(cache(imagemin(imageminOptions))) // generate images cache and minify them
	.pipe(dest(path.images.result)) // paste images
}
exports.generatewebp = generateWebp;

// Generate png sprite
const generatePngSprite = () => {
	var spriteData = 
		src(path.images.pngSource)
		.pipe(spritesmith(pngSpriteOptions));

	var imgStream = spriteData.img
		.pipe(buffer())
		.pipe(imagemin(imageminOptions))
		.pipe(rename(function (path) { // change path
			path.dirname = "img/sprite";
		}))
		.pipe(dest(path.images.result));

	var cssStream = spriteData.css
		.pipe(dest(path.styles.result));

	return merge(imgStream, cssStream);
}
exports.generatepngsprite = generatePngSprite;

// Generate svg sprite

// Transfer fonts
const transferFonts = () => {
	return src(path.fonts.source)
		.pipe(dest(path.fonts.result))
}
exports.transferfonts = transferFonts;

// Transfer favicon
const transferFavicon = () => {
	return src(path.favicon.source)
		.pipe(dest(path.favicon.result))
}
exports.transferfavicon = transferFavicon;

// Transfer files
const transferFiles = () => {
	return src(path.files.source)
		.pipe(dest(path.files.result))
}
exports.transferfiles = transferFiles;

// Transfer files to build
const prod = () => {
	return src(path.dirs.app)
		.pipe(dest(path.dirs.prod))
}
exports.prod = prod;

// Whatching task
const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: "./app/"
		}
	});
	watch(path.markup.whatch, markupCompiller);
	watch(path.styles.whatch, styleCompiller);
	watch(path.styles.libs, cssLibs);
	watch(path.images.source, transferImg);
	watch(path.images.source, generateWebp);
	watch(path.images.pngSource, generatePngSprite);
	watch(path.favicon.source, transferFavicon);
	watch(path.files.source, transferFiles);
	// watch(path.scripts.jsWhatch, jsCompiller);
	// watch(path.scripts.libs, jsLibs);
	// watch(path.fonts.source, transferFonts);
}
exports.watchFiles = watchFiles;

exports.build = series(
	clearProd,
	prod
);

// Launch gulp - "gulp"
exports.default = series(
	clearApp, // clean app directory before compile
	parallel(markupCompiller, styleCompiller, cssLibs, transferImg, generateWebp, transferFavicon, transferFiles, generatePngSprite),
	// parallel(jsCompiller, jsLibs, transferFonts),
	watchFiles
);