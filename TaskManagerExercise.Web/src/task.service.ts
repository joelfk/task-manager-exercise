import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Task } from './task';
import { LoginStatusService } from './login-status.service';

@Injectable()
export class TaskService {
    private tasksUrl = 'http://localhost:52983/v1/tasks';

    constructor(
        private http: Http,
        private loginStatusService: LoginStatusService) { }

    getTasks(): Promise<Task[]> {
        var url = this.loginStatusService.getIsLoggedIn() ? this.tasksUrl : this.tasksUrl + '/outstanding';
        
        return this.http.get(url, { headers: this.createHeaders() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getTask(id: number): Promise<Task> {
        return this.http.get(this.tasksUrl + '/' + id, { headers: this.createHeaders() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    createTask(task: Task): Promise<Response> {
        var headers = new Headers();
        headers.append('Authorization', 'application/x-www-form-urlencoded');

        return this.http.post(this.tasksUrl, JSON.stringify(task), { headers: this.createHeaders() })
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    updateTask(task: Task): Promise<Response> {
        return this.http.put(this.tasksUrl + '/' + task.Id, JSON.stringify(task), { headers: this.createHeaders() })
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    private createHeaders(): Headers {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (this.loginStatusService.getIsLoggedIn()) {
            headers.append('Authorization', 'Bearer ' + this.loginStatusService.getToken());
        }

        return headers;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}