var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var app_1 = require('./components/app/app');
var customProviders = [
    router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS,
    angular2_jwt_1.AuthHttp,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    core_1.provide(angular2_jwt_1.AuthConfig, {
        useFactory: function () {
            return new angular2_jwt_1.AuthConfig();
        }
    })
];
System.import('//localhost:<%= HOT_LOADER_PORT %>/ng2-hot-loader')
    .then(function (loader) {
    loader.ng2HotLoaderBootstrap(app_1.AppCmp, customProviders);
}, function (error) {
    console.log('Could not initialize ng2-hot-loader - fallback to normal init.', error);
    browser_1.bootstrap(app_1.AppCmp, customProviders);
});
//# sourceMappingURL=hot_loader_bootstrap.js.map