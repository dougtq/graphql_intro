const gulp = require('gulp')
const clean = require('gulp-clean')
const gulpType = require('gulp-typescript')

const tsProject = gulpType.createProject('tsconfig.json')

gulp.task('compile', ['move'], () => {

  const tsSource = tsProject.src()
    .pipe(tsProject())
  
  return tsSource.js
    .pipe(gulp.dest('bin'))
})

gulp.task('move', ['clean'], () => {
  return gulp
    .src(['src/**/*.json'])
    .pipe(gulp.dest('bin'))
})

gulp.task('clean', () => {
  return gulp
    .src('bin')
    .pipe(clean())
})

gulp.task('build', ['clean', 'move', 'compile'])

gulp.task('watch', ['build'], () => {
  return gulp.watch(['src/**/**.ts', 'src/**/**.json'], ['build'])
})

gulp.task('default', ['watch'])