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
var LoginStatusService = (function () {
    function LoginStatusService() {
        this.token = null;
        this.loggedInStatusChanged = new core_1.EventEmitter();
    }
    LoginStatusService.prototype.getIsLoggedIn = function () {
        return this.token != null;
    };
    LoginStatusService.prototype.getToken = function () {
        return this.token;
    };
    LoginStatusService.prototype.setToken = function (token) {
        this.token = token;
        this.loggedInStatusChanged.emit(true);
    };
    LoginStatusService.prototype.setLoggedOut = function () {
        this.token = null;
        this.loggedInStatusChanged.emit(false);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoginStatusService.prototype, "loggedInStatusChanged", void 0);
    LoginStatusService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoginStatusService);
    return LoginStatusService;
}());
exports.LoginStatusService = LoginStatusService;
//# sourceMappingURL=login-status.service.js.map