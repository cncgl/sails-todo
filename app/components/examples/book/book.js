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
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
require('rxjs/add/operator/toPromise');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var service_1 = require('./service');
var BookCmp = (function () {
    function BookCmp(routeData) {
        this.count = routeData.get('count');
        this.books = routeData.get('books');
    }
    BookCmp = __decorate([
        core_1.Component({
            selector: 'book',
            templateUrl: './components/examples/book/book.html'
        }),
        router_1.CanActivate(function (next) {
            var injector = core_1.Injector.resolveAndCreate([
                http_1.HTTP_PROVIDERS, service_1.BookService, angular2_jwt_1.AuthHttp,
                core_1.provide(angular2_jwt_1.AuthConfig, {
                    useFactory: function () {
                        return new angular2_jwt_1.AuthConfig();
                    }
                })
            ]);
            var bookService = injector.get(service_1.BookService);
            return new Promise(function (resolve, reject) {
                var parameters = {
                    limit: 20,
                    sort: 'releaseDate DESC'
                };
                Promise.all([
                    bookService.count().toPromise(),
                    bookService.getBooks(parameters).toPromise()
                ]).then(function (data) {
                    next.routeData.data = {
                        count: data[0].count,
                        books: data[1]
                    };
                    resolve(true);
                }, function (error) { return reject(error); });
            });
        }), 
        __metadata('design:paramtypes', [router_1.RouteData])
    ], BookCmp);
    return BookCmp;
})();
exports.BookCmp = BookCmp;
//# sourceMappingURL=book.js.map