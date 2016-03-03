///<reference path="node_modules/angular2/typings/browser.d.ts"/>
import * as gulp from 'gulp';
// import {runSequence, task} from './tools/utils';
import { task } from './tools/utils';
import * as runSequence from 'run-sequence';
import { join } from 'path';
import { APP_SRC, APP_DEST, TOOLS_DIR } from './tools/config';

import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import template from 'gulp-template';
import typescript from 'gulp-typescript';
import * as karma from 'karma';

import tslint from 'gulp-tslint';
import tslintStylish from 'gulp-tslint-stylish';

import sass from 'gulp-sass';

// --------------
// Clean (override).
gulp.task('clean', task('clean', 'all'));
gulp.task('clean.dist', task('clean', 'dist'));
gulp.task('clean.test', task('clean', 'test'));
gulp.task('clean.tmp', task('clean', 'tmp'));

gulp.task('check.versions', task('check.versions'));

// --------------
// Postinstall.
gulp.task('postinstall', done =>
  runSequence(
    'clean',
    'npm',
    done
  ));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence(
    'clean.dist',
    'tslint',
    'build.sass.dev',
    'build.assets.dev',
    'build.js.dev',
    'build.index',
    done
  ));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence(
    'clean.dist',
    'clean.tmp',
    'tslint',
    'build.sass.prod',
    'build.assets.prod',
    'build.html_css.prod',
    'build.deps',
    'build.js.prod',
    'build.bundles',
    'build.index',
    done
  ));

// --------------
// Watch.
gulp.task('build.dev.watch', done =>
  runSequence(
    'build.dev',
    'watch.dev',
    done
  ));

gulp.task('build.test.watch', done =>
  runSequence(
    'build.test',
    'watch.test',
    done
  ));

// --------------
// Test.
gulp.task('tslint', () => {
  let src = [
    join(APP_SRC, '**/*.ts'),
    join(TOOLS_DIR, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.d.ts'),
    '!' + join(TOOLS_DIR, '**/*.d.ts')
  ];
  return gulp.src(src)
    .pipe(tslint())
    .pipe(tslint.report(tslintStylish, {
      emitError: false,
      sort: true,
      bell: true
    }))});

gulp.task('build.sass.test', () =>
  gulp.src(join(APP_SRC, '**', '*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(APP_DEST))
);

gulp.task('build.assets.test', () =>
  gulp.src([
    join(APP_SRC, '**/*.gif'),
    join(APP_SRC, '**/*.jpg'),
    join(APP_SRC, '**/*.png'),
    join(APP_SRC, '**/*.svg'),
    join(APP_SRC, '**/*.css'),
    join(APP_SRC, '**/*.html')
  ])
  .pipe(gulp.dest(APP_DEST))
);

gulp.task('build.js.test', () => {
  let src = [
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*_spec.ts')
  ];

  let result = gulp.src(src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject));

  return result.js
    .pipe(sourcemaps.write())
    .pipe(template(templateLocals()))
    .pipe(gulp.dest(APP_DEST));
});

gulp.task('test', gulp.series(
  'clean.test',
  'tslint',
  'build.sass.test',
  'build.assets.test',
  'build.js.test',
  'build.index',
  'karma.start'
));

/*
done =>
runSequence(
  'clean.test',
  'tslint',
  'build.sass.test',
  'build.assets.test',
  'build.js.test',
  'build.index',
//   'build.test',
  'karma.start',
  done
));
*/

gulp.task('karma.start', done =>
  new (<any>karma).Server({
    configFile: join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }, function() { done(); } ).start());

gulp.task('test2', gulp.parallel('karma.start'));

// --------------
// Serve.
gulp.task('serve', done =>
  runSequence(
    'build.dev',
    'server.start',
    'watch.serve',
    done
  ));

// --------------
// Docs
// Disabled until https://github.com/sebastian-lenz/typedoc/issues/162 gets resolved
// gulp.task('docs', done =>
//   runSequence('build.docs',
//               'serve.docs',
//               done));
