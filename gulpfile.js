'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function () {
  return browserify('./app/index.jsx')
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('eslint', function () {
  return gulp.src('app/**/*.js{,x}')
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('styles', function () {
  return gulp.src('app/index.sass')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      indentedSyntax: true,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['styles', 'views', 'scripts'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', '.']});

  return gulp.src('.tmp/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('views', function () {
  return gulp.src('app/index.jade')
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    '!app/*.jade'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['scripts', 'views', 'styles', 'fonts'], function () {
  var tests = ['mocha', 'eslint'];

  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // reload browser when changes are detected
  gulp.watch('.tmp/**/*').on('change', reload);
  gulp.watch('.tmp/**/*').on('added', reload);
  gulp.watch('.tmp/**/*').on('deleted', reload);

  // run tasks when changes are detected
  gulp.watch('app/**/*.jade', ['views'].concat(tests));
  gulp.watch('app/**/*.js{,x}', ['scripts'].concat(tests));
  gulp.watch('app/**/*.sass', ['styles'].concat(tests));
  gulp.watch('app/fonts/**/*', ['fonts'].concat(tests));
  gulp.watch('tests/spec/**/*.js', ['mocha'].concat(tests));
  gulp.watch('bower.json', ['wiredep', 'fonts'].concat(tests));
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/**/*.sass')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app'));

  gulp.src('app/boilerplate/scripts.jade')
    .pipe(wiredep({
      exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app/boilerplate'));
});

gulp.task('mocha', function () {
  return gulp.src('test/spec/**/*.js', {read: false})
    .pipe($.mocha({ui: 'bdd'}));
});

gulp.task('test', ['eslint'],function () {
  gulp.start('mocha');
});

gulp.task('build', ['eslint', 'scripts', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
