import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateService } from './date.service';

@Component({
    selector: 'date',
    template: `<input type="datetime-local" [value]="_date" (change)="onDateChange($event.target.value)" />`
})
export class DateComponent {
    private _date: string;

    @Input() set date(d: Date) {
        this._date = this.dateService.toDateString(d);
    }

    @Output() dateChange: EventEmitter<Date>;

    constructor(
        private dateService: DateService) {
        this.date = new Date();
        this.dateChange = new EventEmitter();
    }

    private onDateChange(value: string): void {
        if (value != this._date) {
            var parsedDate = this.dateService.parseDateString(value);
            
            if (parsedDate.getTime() != NaN) {
                this._date = value;
                this.dateChange.emit(parsedDate);
            }
        }
    }
}