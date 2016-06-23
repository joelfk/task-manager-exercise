import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Task } from './task';
import { TaskService } from './task.service';
import { LoginStatusService } from './login-status.service';
import { TaskComponent } from './task.component';

@Component({
    selector: 'tasks',
    templateUrl: 'src/tasks.component.html',
    directives: [TaskComponent]
})

export class TasksComponent implements OnInit {
    tasks: Task[];
    loggedInStatus: boolean = false;
    showError: boolean = false;
    error: string;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private loginStatusService: LoginStatusService) { }

    ngOnInit() {
        this.getTasks();
        this.loggedInStatus = this.loginStatusService.getIsLoggedIn();
        this.loginStatusService.loggedInStatusChanged.subscribe(newLoggedInStatus => {
            this.loggedInStatus = newLoggedInStatus
            this.getTasks();
        });
    }

    getTasks() {
        this.showError = false;

        this.taskService.getTasks()
            .then(tasks => this.tasks = tasks)
            .catch(error => {
                this.error = "Error Retrieving Tasks";
                this.showError = true;
            });
    }

    addTask() {
        this.router.navigate(['NewTask']);
    }

    login() {
        this.router.navigate(['Login']);
    }

    logout() {
        this.loginStatusService.setLoggedOut();
    }
}