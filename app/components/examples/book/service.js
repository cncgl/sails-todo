var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
require('rxjs/add/operator/map');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var BookService = (function () {
    function BookService(_authHttp) {
        this._authHttp = _authHttp;
        this.apiUrl = '<%= BACKEND_URL %>';
    }
    BookService.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    BookService.parseParameters = function (parameters) {
        if (Object.keys(parameters).length === 0) {
            return '';
        }
        else {
            return '?' + BookService.serialize(parameters);
        }
    };
    BookService.serialize = function (obj, prefix) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                str.push(typeof v === 'object'
                    ? BookService.serialize(v, k)
                    : encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return str.join('&');
    };
    BookService.prototype.count = function (_a) {
        var _b = (_a === void 0 ? {} : _a).params, params = _b === void 0 ? {} : _b;
        return this._authHttp
            .get(this.apiUrl + '/book/count' + BookService.parseParameters(params), { headers: BookService.getHeaders() })
            .map(function (res) { return res.json(); });
    };
    BookService.prototype.getBooks = function (params) {
        return this._authHttp
            .get(this.apiUrl + '/book' + BookService.parseParameters(params), { headers: BookService.getHeaders() })
            .map(function (res) { return res.json(); });
    };
    BookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], BookService);
    return BookService;
})();
exports.BookService = BookService;
//# sourceMappingURL=service.js.map