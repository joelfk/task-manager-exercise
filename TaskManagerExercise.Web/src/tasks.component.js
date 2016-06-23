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
var task_service_1 = require('./task.service');
var login_status_service_1 = require('./login-status.service');
var task_component_1 = require('./task.component');
var TasksComponent = (function () {
    function TasksComponent(router, taskService, loginStatusService) {
        this.router = router;
        this.taskService = taskService;
        this.loginStatusService = loginStatusService;
        this.loggedInStatus = false;
        this.showError = false;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTasks();
        this.loggedInStatus = this.loginStatusService.getIsLoggedIn();
        this.loginStatusService.loggedInStatusChanged.subscribe(function (newLoggedInStatus) {
            _this.loggedInStatus = newLoggedInStatus;
            _this.getTasks();
        });
    };
    TasksComponent.prototype.getTasks = function () {
        var _this = this;
        this.showError = false;
        this.taskService.getTasks()
            .then(function (tasks) { return _this.tasks = tasks; })
            .catch(function (error) {
            _this.error = "Error Retrieving Tasks";
            _this.showError = true;
        });
    };
    TasksComponent.prototype.addTask = function () {
        this.router.navigate(['NewTask']);
    };
    TasksComponent.prototype.login = function () {
        this.router.navigate(['Login']);
    };
    TasksComponent.prototype.logout = function () {
        this.loginStatusService.setLoggedOut();
    };
    TasksComponent = __decorate([
        core_1.Component({
            selector: 'tasks',
            templateUrl: 'src/tasks.component.html',
            directives: [task_component_1.TaskComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, task_service_1.TaskService, login_status_service_1.LoginStatusService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map