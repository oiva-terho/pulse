import gulp from 'gulp';
import {deleteAsync} from 'del';
import htmlmin from 'gulp-htmlmin';
import csso from 'gulp-csso';
import GulpUglify from 'gulp-uglify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import size from 'gulp-size';
import connect from 'gulp-connect';
import imagemin from "gulp-imagemin";

// Remove dist folder
const clear = async function () {
  return await deleteAsync(['dist']);
};

// HTML task
gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({ title: 'index.html' }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

// SASS task
const sass = gulpSass(dartSass);
gulp.task('sass', function () {
  return gulp
    .src('src/sass/**/*.{sass,scss}', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(size({ title: 'style.css' }))
    .pipe(gulp.dest('dist', { sourcemaps: true }))
    .pipe(connect.reload())
});

// JavaScript task
gulp.task('js', function () {
  return gulp
    .src('src/js/*.js')
    .pipe(GulpUglify())
    .pipe(size({ title: 'script.js' }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

// Assets copy task
gulp.task('assets', function () {
  return gulp
    .src('src/assets/**/*.*')
    .pipe(imagemin())
    .pipe(size({ title: 'assets' }))
    .pipe(gulp.dest('dist/public'))
    .pipe(connect.reload())
});

// Connect task
gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true,
  });
});

gulp.task('watch', function () {
  gulp.watch(['src/*.html'], gulp.series('html'));
  gulp.watch(['src/sass/**/*.{sass, scss}'], gulp.series('sass'));
  gulp.watch(['src/js/*.js'], gulp.series('js'));
});

// Build
const build = gulp.series(clear, gulp.parallel('html', 'sass', 'js', 'assets'));

const dev = gulp.series(build, gulp.parallel('connect', 'watch'));

// Compile
export { build };
export { dev };
export default dev;
