import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { TasksComponent } from './tasks.component';
import { LoginComponent } from './login.component';
import { EditTaskComponent } from './edit-task.component';
import { TaskService } from './task.service';
import { LoginService } from './login.service';
import { LoginStatusService } from './login-status.service';
import { DateService } from './date.service';

@Component({
    selector: 'task-manager-app',
    templateUrl: 'src/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, TaskService, LoginService, LoginStatusService, DateService]
})

@RouteConfig([
    {
        path: '/tasks',
        name: 'Tasks',
        component: TasksComponent,
        useAsDefault: true
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/tasks/:id',
        name: 'EditTask',
        component: EditTaskComponent
    },
    {
        path: '/tasks/new',
        name: 'NewTask',
        component: EditTaskComponent
    }
])

export class AppComponent {
    title = 'Task Manager Exercise';
}