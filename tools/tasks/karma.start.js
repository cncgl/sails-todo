var karma = require('karma');
var path_1 = require('path');
module.exports = function karmaStart() {
    return function (done) {
        new karma.Server({
            configFile: path_1.join(process.cwd(), 'karma.conf.js'),
            singleRun: true
        }, function () { done(); }).start();
    };
};
//# sourceMappingURL=karma.start.js.map