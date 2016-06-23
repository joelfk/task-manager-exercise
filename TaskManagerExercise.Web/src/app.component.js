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
var tasks_component_1 = require('./tasks.component');
var login_component_1 = require('./login.component');
var edit_task_component_1 = require('./edit-task.component');
var task_service_1 = require('./task.service');
var login_service_1 = require('./login.service');
var login_status_service_1 = require('./login-status.service');
var date_service_1 = require('./date.service');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Task Manager Exercise';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'task-manager-app',
            templateUrl: 'src/app.component.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [router_deprecated_1.ROUTER_PROVIDERS, task_service_1.TaskService, login_service_1.LoginService, login_status_service_1.LoginStatusService, date_service_1.DateService]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/tasks',
                name: 'Tasks',
                component: tasks_component_1.TasksComponent,
                useAsDefault: true
            },
            {
                path: '/login',
                name: 'Login',
                component: login_component_1.LoginComponent
            },
            {
                path: '/tasks/:id',
                name: 'EditTask',
                component: edit_task_component_1.EditTaskComponent
            },
            {
                path: '/tasks/new',
                name: 'NewTask',
                component: edit_task_component_1.EditTaskComponent
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map