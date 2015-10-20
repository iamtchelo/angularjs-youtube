var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  return sass('./src/assets/scss/style.scss', {
    style: 'compressed',
    compass: true
  })
  .on('error', sass.logError)
  .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('template', function() {
  return gulp.src('./src/jade/public/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/assets/scss/**/*', ['sass']);
  gulp.watch('./src/jade/public/**/*', ['template']);
});

gulp.task('default', ['sass', 'template']);
