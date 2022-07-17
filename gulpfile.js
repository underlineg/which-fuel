let gulp = require('gulp');
let gutil = require('gulp-util');
let uglify = require('gulp-uglify-es').default;
let concat = require('gulp-concat');
let sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
// let jshint = require('gulp-jshint');
let cache = require('gulp-cached');



//pasta de destino
let directory = '.';


// Scripts
gulp.task('scripts', function(){
	return gulp
	.src(directory+'/src/javascript/*.js')
	.pipe(sourcemaps.init())
	.pipe(uglify())
	// .pipe(concat('scripts.min.js'))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest(directory + '/js'));
});


// Sass
gulp.task('sass', function () {
	return gulp.src(directory+'/src/sass/main.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(concat('style.min.css'))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest(directory+'/css'));
  });
   

  
/*gulp.task('sass', async function() {
	sass(directory+'/src/sass/main.scss', {style: 'compressed', sourcemap: true})
	.on('error', function (err) {
		console.error('Error!', err.message);
	})
	.pipe(concat('style.min.css'))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest(directory + '/css'));
});*/

// Watch 
gulp.task('watch', function(){
	gulp.watch(directory+'/src/javascript/**/*.js', gulp.series('scripts'));
	gulp.watch(directory+'/src/sass/**/*.scss', gulp.series('sass'));
});



// gulp.task('default', gulp.series('scripts', 'tinypng', 'sass', 'watch'));
gulp.task('default', gulp.series('scripts', 'sass', 'watch'));