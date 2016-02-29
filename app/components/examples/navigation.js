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
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var NavigationCmp = (function () {
    function NavigationCmp(_location) {
        this._location = _location;
    }
    NavigationCmp.prototype.isActive = function (path) {
        var regExp = new RegExp(path, 'gi');
        return !!this._location.path().match(regExp);
    };
    NavigationCmp = __decorate([
        core_1.Component({
            selector: 'navigation-component',
            templateUrl: './components/examples/navigation.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Location])
    ], NavigationCmp);
    return NavigationCmp;
})();
exports.NavigationCmp = NavigationCmp;
//# sourceMappingURL=navigation.js.map