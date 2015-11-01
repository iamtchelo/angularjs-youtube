var gulp = require('gulp');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  return sass('./src/assets/scss/app.scss', {
    style: 'compressed',
    compass: true
  })
  .on('error', sass.logError)
  .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('template', function() {
  return gulp.src('./src/jade/public/**/*.jade')
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('scripts', function() {
  return gulp.src('./src/assets/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('./src/assets/scss/**/*', ['sass']);
  gulp.watch('./src/assets/js/**/*', ['scripts'])
  gulp.watch('./src/jade/public/**/*', ['template']);
});

gulp.task('default', ['sass', 'scripts', 'template']);
