const gulp = require('gulp')

const sass = require('gulp-sass')(require('sass'));

const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const rename = require('gulp-rename');

function styles(cb) {
  gulp.src('src/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concatCss('style.css', {'rebaseUrls': false}))
  .pipe(cleanCss())
  .pipe(rename({basename: 'style', suffix: '.min'}))
  .pipe(gulp.dest('dest/'))
  cb()
}

function copyHTMLFile(cb) {
  gulp.src('src/index.html')
  .pipe(gulp.dest('dest/'))
  cb()
}

function watch(cb) {
//  gulp.watch('src/**/*.html', gulp.series(copyHTMLFile))
// gulp.watch('src/sass/**/*.sccc', gulp.series(styles)) */
gulp.watch(['src/**/*.html', 'src/sass/**/*.scss'], gulp.series(copyHTMLFile, styles))
 cb()
}


exports.copyHTMLFile = copyHTMLFile
exports.watch = watch
exports.styles = styles
exports.default = gulp.series(gulp.parallel(copyHTMLFile, styles), watch)