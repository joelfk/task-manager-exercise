import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
    parseDateString(date: string): Date {
        date = date.replace('T', '-');
        var parts = date.split('-');
        var timeParts = parts[3].split(':');

        return new Date(+parts[0], +parts[1] - 1, +parts[2], +timeParts[0], +timeParts[1]);
    }

    toDateString(date: Date): string {
        return (date.getFullYear().toString() + '-'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
            + ("0" + (date.getDate())).slice(-2))
            + 'T' + date.toTimeString().slice(0, 5);
    }

    toDisplayString(date: Date): string {
        return(date.getFullYear().toString() + '-'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
            + ("0" + (date.getDate())).slice(-2));
    }
}