import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class LoginStatusService {
    private token: string = null; 

    @Output() loggedInStatusChanged = new EventEmitter();

    getIsLoggedIn(): boolean {
        return this.token != null;
    }

    getToken(): string {
        return this.token;
    }

    setToken(token: string) {
        this.token = token;
        this.loggedInStatusChanged.emit(true);
    }

    setLoggedOut() {
        this.token = null;
        this.loggedInStatusChanged.emit(false);
    }
}