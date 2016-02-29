var about_1 = require('../about/about');
var login_1 = require('../login/login');
var examples_1 = require('../examples/examples');
var Routes = (function () {
    function Routes() {
    }
    Routes.get = function () {
        return Routes.items;
    };
    Routes.items = [
        { path: '/', redirectTo: ['About'] },
        { path: '/about', component: about_1.AboutCmp, name: 'About' },
        { path: '/examples/...', component: examples_1.ExamplesCmp, name: 'Examples' },
        { path: '/login', component: login_1.LoginCmp, name: 'Login' }
    ];
    return Routes;
})();
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map