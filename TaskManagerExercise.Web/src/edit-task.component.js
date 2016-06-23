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
var date_service_1 = require('./date.service');
var login_status_service_1 = require('./login-status.service');
var date_component_1 = require('./date.component');
var EditTaskComponent = (function () {
    function EditTaskComponent(router, routeParams, taskService, dateService, loginStatusService) {
        this.router = router;
        this.routeParams = routeParams;
        this.taskService = taskService;
        this.dateService = dateService;
        this.loginStatusService = loginStatusService;
        this.dueDate = new Date();
        this.showError = false;
    }
    EditTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.loginStatusService.getIsLoggedIn()) {
            this.router.navigate(['Tasks']);
        }
        if (this.routeParams.get('id') !== null) {
            this.editing = true;
            var id = +this.routeParams.get('id');
            this.taskService.getTask(id).then(function (task) {
                _this.id = task.Id;
                _this.title = task.Title;
                _this.details = task.Details;
                _this.dueDate = _this.dateService.parseDateString(task.DueDate);
            });
        }
        else {
            this.editing = false;
        }
    };
    EditTaskComponent.prototype.save = function () {
        var _this = this;
        var task = new task_1.Task();
        task.Title = this.title;
        task.Details = this.details;
        task.DueDate = this.dateService.toDateString(this.dueDate);
        if (this.editing) {
            task.Id = this.id;
            this.taskService.updateTask(task)
                .then(function (response) { return _this.router.navigate(['Tasks']); })
                .catch(function (error) {
                _this.error = "Error Updating Task";
                _this.showError = true;
            });
        }
        else {
            this.taskService.createTask(task)
                .then(function (response) { return _this.router.navigate(['Tasks']); })
                .catch(function (error) {
                _this.error = "Error Creating Task";
                _this.showError = true;
            });
        }
    };
    EditTaskComponent = __decorate([
        core_1.Component({
            selector: 'edit-task',
            templateUrl: 'src/edit-task.component.html',
            directives: [date_component_1.DateComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, task_service_1.TaskService, date_service_1.DateService, login_status_service_1.LoginStatusService])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=edit-task.component.js.map