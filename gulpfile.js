var gulp = require('gulp');
var utils_1 = require('./tools/utils');
var runSequence = require('run-sequence');
var path_1 = require('path');
var config_1 = require('./tools/config');
var gulp_plumber_1 = require('gulp-plumber');
var gulp_sourcemaps_1 = require('gulp-sourcemaps');
var gulp_template_1 = require('gulp-template');
var gulp_typescript_1 = require('gulp-typescript');
var karma = require('karma');
var gulp_tslint_1 = require('gulp-tslint');
var gulp_tslint_stylish_1 = require('gulp-tslint-stylish');
var gulp_sass_1 = require('gulp-sass');
gulp.task('clean', utils_1.task('clean', 'all'));
gulp.task('clean.dist', utils_1.task('clean', 'dist'));
gulp.task('clean.test', utils_1.task('clean', 'test'));
gulp.task('clean.tmp', utils_1.task('clean', 'tmp'));
gulp.task('check.versions', utils_1.task('check.versions'));
gulp.task('postinstall', function (done) {
    return runSequence('clean', 'npm', done);
});
gulp.task('build.dev', function (done) {
    return runSequence('clean.dist', 'tslint', 'build.sass.dev', 'build.assets.dev', 'build.js.dev', 'build.index', done);
});
gulp.task('build.prod', function (done) {
    return runSequence('clean.dist', 'clean.tmp', 'tslint', 'build.sass.prod', 'build.assets.prod', 'build.html_css.prod', 'build.deps', 'build.js.prod', 'build.bundles', 'build.index', done);
});
gulp.task('build.dev.watch', function (done) {
    return runSequence('build.dev', 'watch.dev', done);
});
gulp.task('build.test.watch', function (done) {
    return runSequence('build.test', 'watch.test', done);
});
gulp.task('tslint', function () {
    var src = [
        path_1.join(config_1.APP_SRC, '**/*.ts'),
        path_1.join(config_1.TOOLS_DIR, '**/*.ts'),
        '!' + path_1.join(config_1.APP_SRC, '**/*.d.ts'),
        '!' + path_1.join(config_1.TOOLS_DIR, '**/*.d.ts')
    ];
    return gulp.src(src)
        .pipe(gulp_tslint_1.default())
        .pipe(gulp_tslint_1.default.report(gulp_tslint_stylish_1.default, {
        emitError: false,
        sort: true,
        bell: true
    }));
});
gulp.task('build.sass.test', function () {
    return gulp.src(path_1.join(config_1.APP_SRC, '**', '*.scss'))
        .pipe(gulp_sass_1.default().on('error', gulp_sass_1.default.logError))
        .pipe(gulp.dest(config_1.APP_DEST));
});
gulp.task('build.assets.test', function () {
    return gulp.src([
        path_1.join(config_1.APP_SRC, '**/*.gif'),
        path_1.join(config_1.APP_SRC, '**/*.jpg'),
        path_1.join(config_1.APP_SRC, '**/*.png'),
        path_1.join(config_1.APP_SRC, '**/*.svg'),
        path_1.join(config_1.APP_SRC, '**/*.css'),
        path_1.join(config_1.APP_SRC, '**/*.html')
    ])
        .pipe(gulp.dest(config_1.APP_DEST));
});
gulp.task('build.js.test', function () {
    var src = [
        path_1.join(config_1.APP_SRC, '**/*.ts'),
        '!' + path_1.join(config_1.APP_SRC, '**/*_spec.ts')
    ];
    var result = gulp.src(src)
        .pipe(gulp_plumber_1.default())
        .pipe(gulp_sourcemaps_1.default.init())
        .pipe(gulp_typescript_1.default(tsProject));
    return result.js
        .pipe(gulp_sourcemaps_1.default.write())
        .pipe(gulp_template_1.default(templateLocals()))
        .pipe(gulp.dest(config_1.APP_DEST));
});
gulp.task('test', gulp.series('clean.test', 'tslint', 'build.sass.test', 'build.assets.test', 'build.js.test', 'build.index', 'karma.start'));
gulp.task('karma.start', function (done) {
    return new karma.Server({
        configFile: path_1.join(process.cwd(), 'karma.conf.js'),
        singleRun: true
    }, function () { done(); }).start();
});
gulp.task('test2', gulp.parallel('karma.start'));
gulp.task('serve', function (done) {
    return runSequence('build.dev', 'server.start', 'watch.serve', done);
});
//# sourceMappingURL=gulpfile.js.map