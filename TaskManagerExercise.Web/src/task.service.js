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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var login_status_service_1 = require('./login-status.service');
var TaskService = (function () {
    function TaskService(http, loginStatusService) {
        this.http = http;
        this.loginStatusService = loginStatusService;
        this.tasksUrl = 'http://localhost:52983/v1/tasks';
    }
    TaskService.prototype.getTasks = function () {
        var url = this.loginStatusService.getIsLoggedIn() ? this.tasksUrl : this.tasksUrl + '/outstanding';
        return this.http.get(url, { headers: this.createHeaders() })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.getTask = function (id) {
        return this.http.get(this.tasksUrl + '/' + id, { headers: this.createHeaders() })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.createTask = function (task) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'application/x-www-form-urlencoded');
        return this.http.post(this.tasksUrl, JSON.stringify(task), { headers: this.createHeaders() })
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    TaskService.prototype.updateTask = function (task) {
        return this.http.put(this.tasksUrl + '/' + task.Id, JSON.stringify(task), { headers: this.createHeaders() })
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    TaskService.prototype.createHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.loginStatusService.getIsLoggedIn()) {
            headers.append('Authorization', 'Bearer ' + this.loginStatusService.getToken());
        }
        return headers;
    };
    TaskService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, login_status_service_1.LoginStatusService])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map