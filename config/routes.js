var yargs_1 = require('yargs');
exports.ENV = yargs_1.argv['env'] || 'dev';
exports.APP_BASE = yargs_1.argv['base'] || '/';
exports.APP_DEST = "dist/" + exports.ENV;
exports.APP_ROOT = exports.ENV === 'dev' ? "" + exports.APP_BASE + exports.APP_DEST + "/" : "" + exports.APP_BASE;
module.exports.routes = {
    '/': {
        view: "" + exports.APP_ROOT
    }
};
//# sourceMappingURL=routes.js.map