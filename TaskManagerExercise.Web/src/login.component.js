"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var login_service_1 = require('./login.service');
var login_status_service_1 = require('./login-status.service');
var LoginComponent = (function () {
    function LoginComponent(router, loginService, loginStatusService) {
        this.router = router;
        this.loginService = loginService;
        this.loginStatusService = loginStatusService;
        this.showError = false;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.showError = false;
        this.loginService
            .login(this.username, this.password)
            .then(function (response) {
            _this.loginStatusService.setToken(response.access_token);
            _this.router.navigate(['Tasks']);
        })
            .catch(function (error) {
            _this.error = "Login Error";
            _this.showError = true;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'src/login.component.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, login_service_1.LoginService, login_status_service_1.LoginStatusService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map