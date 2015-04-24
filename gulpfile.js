var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var handleErrors = require('./utils/handleErrors.js');

gulp.task('js', function(){
	browserify('./public/javascripts/src/app.jsx')
	   .transform(reactify)
	   .bundle() 
	   .pipe(source('app.js'))
	   .pipe(gulp.dest('public/javascripts/build'));
});


gulp.task('less', function() {
  return gulp.src('public/stylesheets/less/**.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/stylesheets/css'));
});


gulp.task('watch', function (){
	gulp.watch("public/javascripts/src/**/*.jsx", ["js"])
	gulp.watch("public/stylesheets/less/*.less", ["less"])
});

gulp.task('default', ['js', 'less']);