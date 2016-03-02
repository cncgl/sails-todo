import {join} from 'path';
import {APP_SRC, TEST_DEST} from '../config';
import {tsProjectFn} from '../utils';

export = function buildTest(gulp, plugins) {
  return function() {
    let tsProject = tsProjectFn(plugins);
    let src = [
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, 'bootstrap.ts')
    ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: TEST_DEST }))
      // .pipe(plugins.typescript.filter(tsProject, { referencedFrom: ['typings/browser/ambient/es6-promise/es6-promise.d.ts'] }));
      .pipe(plugins.typescript(tsProject, {
        referencedFrom: [
          // join(__dirname, '../../node_modules/angular2/typings/browser.d.ts')
          '../../node_modules/angular2/typings/browser.d.ts'
        ]
      }));

    return result.js
      .pipe(gulp.dest(TEST_DEST));
  };
};
