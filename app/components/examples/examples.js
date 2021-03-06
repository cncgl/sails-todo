var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var navigation_1 = require('./navigation');
var routes_1 = require('./routes');
var ExamplesCmp = (function () {
    function ExamplesCmp() {
    }
    ExamplesCmp = __decorate([
        core_1.Component({
            selector: 'examples',
            templateUrl: './components/examples/examples.html',
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [router_1.ROUTER_DIRECTIVES, navigation_1.NavigationCmp]
        }),
        router_1.RouteConfig(routes_1.Routes.get()),
        router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
        __metadata('design:paramtypes', [])
    ], ExamplesCmp);
    return ExamplesCmp;
})();
exports.ExamplesCmp = ExamplesCmp;
//# sourceMappingURL=examples.js.map