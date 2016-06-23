import { Injectable, EventEmitter, Output } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LoginResponse } from './login-response';

@Injectable()
export class LoginService {
    private loginUrl = 'https://localhost:44301/token';

    constructor(private http: Http) { }

    login(username: string, password: string): Promise<LoginResponse> {
        var credentials = "username=" + username + "&password=" + password + "&grant_type=password";
         
        return this.http.post(this.loginUrl, credentials)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Promise.reject(error.message || error);
    }
}