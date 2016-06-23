import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Task } from './task';
import { TaskService } from './task.service';
import { DateService } from './date.service';
import { LoginStatusService } from './login-status.service';
import { DateComponent } from './date.component';

@Component({
    selector: 'edit-task',
    templateUrl: 'src/edit-task.component.html',
    directives: [DateComponent]
})

export class EditTaskComponent implements OnInit {
    editing: boolean;
    id: number;
    title: string;
    details: string;
    dueDate: Date = new Date();
    showError: boolean = false;
    error: string;

    constructor(
        private router: Router,
        private routeParams: RouteParams,
        private taskService: TaskService,
        private dateService: DateService,
        private loginStatusService: LoginStatusService) { }

    ngOnInit() {
        if (!this.loginStatusService.getIsLoggedIn()) {
            this.router.navigate(['Tasks']);
        }

        if (this.routeParams.get('id') !== null) {
            this.editing = true;
            let id = +this.routeParams.get('id');
            this.taskService.getTask(id).then(task => {
                this.id = task.Id;
                this.title = task.Title;
                this.details = task.Details;
                this.dueDate = this.dateService.parseDateString(task.DueDate)
            });
        }
        else {
            this.editing = false;
        }
    }

    save() {
        let task = new Task();
        task.Title = this.title;
        task.Details = this.details;
        task.DueDate = this.dateService.toDateString(this.dueDate);

        if (this.editing) {
            task.Id = this.id

            this.taskService.updateTask(task)
                .then(response => this.router.navigate(['Tasks']))
                .catch(error => {
                    this.error = "Error Updating Task";
                    this.showError = true;
                });
        }
        else {
            this.taskService.createTask(task)
                .then(response => this.router.navigate(['Tasks']))
                .catch(error => {
                    this.error = "Error Creating Task";
                    this.showError = true;
                });
        }
    }
}