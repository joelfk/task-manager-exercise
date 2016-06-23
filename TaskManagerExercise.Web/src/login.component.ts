import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { NgForm }    from '@angular/common';
import { LoginService } from './login.service';
import { LoginStatusService } from './login-status.service';

@Component({
    selector: 'login',
    templateUrl: 'src/login.component.html'
})

export class LoginComponent {
    username: string;
    password: string;
    showError: boolean = false;
    error: string;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private loginStatusService: LoginStatusService) { }

    login() {
        this.showError = false;

        this.loginService
            .login(this.username, this.password)
            .then(response => {
                this.loginStatusService.setToken(response.access_token)
                this.router.navigate(['Tasks']);
            })
            .catch(error => {
                this.error = "Login Error";
                this.showError = true;
            });
    }
}