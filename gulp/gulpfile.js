var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var del = require('del');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('clean', function(cb){
  del(['../site/*'], cb);
});


gulp.task('styles', function(){
 var injectAppFiles = gulp.src('../src/styles/*.scss', {read: false});
 var injectGlobalFiles = gulp.src('../src/global/*.scss', {read: false});
 
  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }
 
  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectGlobalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };

  return gulp.src('../src/main.scss')
  	.pipe(wiredep())
  	.pipe(inject(injectGlobalFiles, injectGlobalOptions))
  	.pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('../site/styles'));
});

gulp.task('html', ['styles', 'js', 'images'], function() {
  var injectFiles = gulp.src(['../site/styles/*.css',
    '../site/js/*.js']);

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['../site']
  };

  return gulp.src('../src/**/*.html')
    .pipe(inject(injectFiles, injectOptions))
    .pipe(wiredep())
    .pipe(gulp.dest('../site/'));
});

gulp.task('js', function() {
  return gulp.src('../src/**/*.js')
    .pipe(gulp.dest('../site/'));
});

gulp.task('images', function() {
  return gulp.src('../src/images/*.png')
    .pipe(gulp.dest('../site/images'));
});

// Watch files for changes & reload
gulp.task('serve', ['html'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['../site']
  });

  gulp.watch(['../src/**/*.html'], ['html', reload]);
  gulp.watch(['../src/**/*.png'], ['images', reload]);
  gulp.watch(['../src/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['../src/global/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['../src/**/*.js'], ['js', reload]);
});

gulp.task('default', [ 'styles', 'js', 'images', 'html','serve'], function(){
});
