var runSequence = require('run-sequence');
var path_1 = require('path');
var config_1 = require('../config');
var utils_1 = require('../utils');
module.exports = function watchServe(gulp, plugins) {
    return function () {
        plugins.watch(path_1.join(config_1.APP_SRC, '**'), function (event) {
            return runSequence('build.dev', function () { return utils_1.notifyLiveReload(event); });
        });
    };
};
//# sourceMappingURL=watch.serve.js.map