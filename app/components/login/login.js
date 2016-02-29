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
var http_1 = require('angular2/http');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var LoginCmp = (function () {
    function LoginCmp(fb, _http, _router) {
        this._http = _http;
        this._router = _router;
        this.loggedIn = angular2_jwt_1.tokenNotExpired();
        this.apiUrl = '<%= BACKEND_URL %>';
        if (this.loggedIn) {
            this._router.navigate(['/Examples/Book']);
        }
        this.form = fb.group({
            identifier: ['', common_1.Validators.required],
            password: ['', common_1.Validators.required]
        });
    }
    LoginCmp.prototype.onSubmit = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http
            .post(this.apiUrl + '/login', JSON.stringify(this.form.value), { headers: headers })
            .subscribe(function (response) {
            var data = response.json();
            localStorage.setItem('id_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            _this._router.navigate(['/Examples/Book']);
        }, function (error) {
            console.log('error');
            console.log(error);
        });
    };
    LoginCmp = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './components/login/login.html',
            styleUrls: ['./components/login/login.css'],
            directives: [common_1.FORM_DIRECTIVES],
            providers: [common_1.FormBuilder]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, router_1.Router])
    ], LoginCmp);
    return LoginCmp;
})();
exports.LoginCmp = LoginCmp;
//# sourceMappingURL=login.js.map