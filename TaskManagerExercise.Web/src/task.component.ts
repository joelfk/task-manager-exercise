import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Task } from './task';
import { TaskService } from './task.service';
import { LoginStatusService } from './login-status.service';
import { DateService } from './date.service';

@Component({
    selector: 'task',
    templateUrl: 'src/task.component.html'
})

export class TaskComponent implements OnInit {
    @Input() task: Task;
    loggedInStatus: boolean = false;
    showComplete: boolean = false;
    dueDateDetails: string;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private loginStatusService: LoginStatusService,
        private dateService: DateService) { }

    ngOnInit() {
        this.loggedInStatus = this.loginStatusService.getIsLoggedIn();
        this.loginStatusService.loggedInStatusChanged.subscribe(newLoggedInStatus => {
            this.loggedInStatus = newLoggedInStatus;
        });

        this.showComplete = this.loggedInStatus && !this.task.CompletedTime;
        this.dueDateDetails = this.getDueDateDetails();
    }

    edit() {
        this.router.navigate(['EditTask', { id: this.task.Id }]);
    }

    complete() {
        this.task.CompletedTime = this.dateService.toDateString(new Date());
        this.taskService.updateTask(this.task)
            .then(response => this.showComplete = this.loggedInStatus && !this.task.CompletedTime)
            .catch(this.handleCompleteError);
    }

    handleCompleteError(error: any) {
        console.error('An error occurred', error);
    }

    private getDueDateDetails() {
        if (this.task.CompletedTime) {
            return "Completed";
        }
        else {
            return 'Due ' + this.dateService.toDisplayString(this.dateService.parseDateString(this.task.DueDate));
        }
    }
}