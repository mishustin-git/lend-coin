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
const webp = require('gulp-webp');



const path = {
	markup: {
		pugWhatch: './src/layout/**/*.pug',
		pugCompile: './src/layout/pages/*.pug',
		result: './app/'
	},
	styles: {
		scssWhatch: './src/layout/**/*.{scss,sass}',
		scssCompile: './src/layout/common/*.{scss,sass}',
		result: './app/css/',
		libs: [
			'./src/assets/libs/swiper/swiper-bundle.min.css',
			'./src/assets/libs/tingle-master/tingle.min.css',
		]
	},
	scripts: {
		jsWhatch: './src/layout/**/*.js',
		jsCompile: './src/layout/common/*.js',
		result: './app/js/',
		libs: [
			'./src/assets/libs/swiper/swiper-bundle.min.js',
			'./src/assets/libs/tingle-master/tingle.min.js',
			'./src/assets/libs/Inputmask/inputmask.min.js'
		]
	},
	images: {
		source: './src/layout/**/*.{jpg,jpeg,png,svg}',
		result: './app/',
		svgSource: './src/layout/components/icons/',
		svgResult: './app/img/icons/'
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

// clean app directory before compile
const clean = () => {
	return del(path.dirs.app)
}
exports.clean = clean;
// clean prod directory before compile
const cleanProd = () => {
	return del(path.dirs.prod)
}
exports.clean = clean;

// Compile pug to html
const pugCompiller = () => {
	return src(path.markup.pugCompile)
		.pipe(pug())
		.pipe(formatHtml())
		.pipe(dest(path.markup.result))
		.pipe(browserSync.stream());
}
exports.pugCompiller = pugCompiller;

// Compile scss to css
const scssCompiller = () => {
	return src(path.styles.scssCompile)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', notify.onError()))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			compatibility: 'ie10',
			// format: {
			// 	breaks: {
			// 		afterAtRule: true,
			// 		afterBlockBegins: true,
			// 		afterBlockEnds: true,
			// 		afterComment: true,
			// 		afterProperty: true,
			// 		afterRuleBegins: true,
			// 		afterRuleEnds: true,
			// 		beforeBlockEnds: true,
			// 		betweenSelectors: true
			// 	},
			// 	breakWith: '\n',
			// 	indentBy: 2,
			// 	indentWith: 'space',
			// 	spaces: {
			// 		aroundSelectorRelation: false,
			// 		beforeBlockBegins: false,
			// 		beforeValue: true
			// 	},
			// 	wrapAt: false,
			// 	semicolonAfterLastProperty: false
			// }
		}))
		.pipe(rename(function (path) {
			path.basename += ".min";
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(path.styles.result))
		.pipe(browserSync.stream())
}
exports.scssCompiller = scssCompiller;

// Concat css libs
const cssLibs = () => {
	return src(path.styles.libs)
		.pipe(concat('libs.min.css'), {
			allowEmpty: true
		})
		.pipe(cleanCSS({
			compatibility: 'ie10'
		}))
		.pipe(dest(path.styles.result))
		.pipe(browserSync.stream())
}
exports.cssLibs = cssLibs;

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
exports.jsCompiller = jsCompiller;

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
exports.jsLibs = jsLibs;

// Transfer images to app directory
const transferImg = () => {
	return src(path.images.source)
		// .pipe(webp())
		// .pipe(rename(function (path) {
		// 	path.dirname = "img/";
		// }))
		// .pipe(src(path.images.source))
		.pipe(rename(function (path) {
			path.dirname = "img/";
		}))
		.pipe(dest(path.images.result))
}
exports.transferImg = transferImg;

// Transfer fonts
const transferFonts = () => {
	return src(path.fonts.source)
		.pipe(dest(path.fonts.result))
}
exports.transferFonts = transferFonts;
// Transfer favicon
const transferFavicon = () => {
	return src(path.favicon.source)
		.pipe(dest(path.favicon.result))
}
exports.transferFavicon = transferFavicon;

// Transfer files
const transferFiles = () => {
	return src(path.files.source)
		.pipe(dest(path.files.result))
}
exports.transferFiles = transferFiles;

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
	watch(path.markup.pugWhatch, pugCompiller);
	watch(path.styles.scssWhatch, scssCompiller);
	watch(path.scripts.jsWhatch, jsCompiller);
	watch(path.images.source, transferImg);
	watch(path.styles.libs, cssLibs);
	watch(path.scripts.libs, jsLibs);
	watch(path.fonts.source, transferFonts);
}
exports.watchFiles = watchFiles;

exports.build = series(
	cleanProd,
	prod
);

// Launch gulp - "gulp"
exports.default = series(
	clean,
	parallel(scssCompiller, jsCompiller, cssLibs, jsLibs, pugCompiller, transferImg, transferFonts, transferFavicon),
	watchFiles
);