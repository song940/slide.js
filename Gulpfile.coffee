gulp      = require 'gulp'
umd       = require 'gulp-umd'
less      = require 'gulp-less'
rename    = require 'gulp-rename'
uglify    = require 'gulp-uglify'
minifyCss = require 'gulp-minify-css'

gulp.task 'default', [ 'build', 'watch' ]

gulp.task 'build', [ 'js', 'less' ]

gulp.task 'js', () ->
  gulp
    .src 'src/*.js'
    .pipe umd()
    .pipe gulp.dest('build/')
    .pipe uglify()
    .pipe rename(suffix:'.min')
    .pipe gulp.dest('build/')

gulp.task 'less', () ->
  gulp
    .src 'src/*.less'
    .pipe less()
    .pipe gulp.dest('build/')
    .pipe minifyCss()
    .pipe rename(suffix: '.min')
    .pipe gulp.dest('build/')

gulp.task 'watch', () ->
  gulp.watch 'src/*.js',    [ 'js' ]
  gulp.watch 'src/*.less',  [ 'less' ]
