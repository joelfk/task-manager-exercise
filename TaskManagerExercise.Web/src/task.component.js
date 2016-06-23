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
var task_1 = require('./task');
var task_service_1 = require('./task.service');
var login_status_service_1 = require('./login-status.service');
var date_service_1 = require('./date.service');
var TaskComponent = (function () {
    function TaskComponent(router, taskService, loginStatusService, dateService) {
        this.router = router;
        this.taskService = taskService;
        this.loginStatusService = loginStatusService;
        this.dateService = dateService;
        this.loggedInStatus = false;
        this.showComplete = false;
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedInStatus = this.loginStatusService.getIsLoggedIn();
        this.loginStatusService.loggedInStatusChanged.subscribe(function (newLoggedInStatus) {
            _this.loggedInStatus = newLoggedInStatus;
        });
        this.showComplete = this.loggedInStatus && !this.task.CompletedTime;
        this.dueDateDetails = this.getDueDateDetails();
    };
    TaskComponent.prototype.edit = function () {
        this.router.navigate(['EditTask', { id: this.task.Id }]);
    };
    TaskComponent.prototype.complete = function () {
        var _this = this;
        this.task.CompletedTime = this.dateService.toDateString(new Date());
        this.taskService.updateTask(this.task)
            .then(function (response) { return _this.showComplete = _this.loggedInStatus && !_this.task.CompletedTime; })
            .catch(this.handleCompleteError);
    };
    TaskComponent.prototype.handleCompleteError = function (error) {
        console.error('An error occurred', error);
    };
    TaskComponent.prototype.getDueDateDetails = function () {
        if (this.task.CompletedTime) {
            return "Completed";
        }
        else {
            return 'Due ' + this.dateService.toDisplayString(this.dateService.parseDateString(this.task.DueDate));
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', task_1.Task)
    ], TaskComponent.prototype, "task", void 0);
    TaskComponent = __decorate([
        core_1.Component({
            selector: 'task',
            templateUrl: 'src/task.component.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, task_service_1.TaskService, login_status_service_1.LoginStatusService, date_service_1.DateService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map