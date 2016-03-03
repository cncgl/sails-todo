///<reference path="node_modules/angular2/typings/browser.d.ts"/>
import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';
// import { join } from 'path';
// import { APP_SRC, APP_DEST, TOOLS_DIR } from './tools/config';

// --------------
// Clean (override).
gulp.task('clean',      task('clean', 'all'));
gulp.task('clean.dist', task('clean', 'dist'));
gulp.task('clean.test', task('clean', 'test'));
gulp.task('clean.tmp',  task('clean', 'tmp'));

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
gulp.task('test', done =>
  runSequence(
    'clean.test',
    'tslint',
    'build.sass.test',
    'build.assets.test',
    'build.js.test',
    'build.index',
    'karma.start',
    done
  ));

/*
gulp.task('karma.start', done =>
  new (<any>karma).Server({
    configFile: join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }, function() { done(); } ).start());
*/

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
