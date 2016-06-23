"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var date_service_1 = require('./date.service');
var DateComponent = (function () {
    function DateComponent(dateService) {
        this.dateService = dateService;
        this.date = new Date();
        this.dateChange = new core_1.EventEmitter();
    }
    Object.defineProperty(DateComponent.prototype, "date", {
        set: function (d) {
            this._date = this.dateService.toDateString(d);
        },
        enumerable: true,
        configurable: true
    });
    DateComponent.prototype.onDateChange = function (value) {
        if (value != this._date) {
            var parsedDate = this.dateService.parseDateString(value);
            if (parsedDate.getTime() != NaN) {
                this._date = value;
                this.dateChange.emit(parsedDate);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date), 
        __metadata('design:paramtypes', [Date])
    ], DateComponent.prototype, "date", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateComponent.prototype, "dateChange", void 0);
    DateComponent = __decorate([
        core_1.Component({
            selector: 'date',
            template: "<input type=\"datetime-local\" [value]=\"_date\" (change)=\"onDateChange($event.target.value)\" />"
        }), 
        __metadata('design:paramtypes', [date_service_1.DateService])
    ], DateComponent);
    return DateComponent;
}());
exports.DateComponent = DateComponent;
//# sourceMappingURL=date.component.js.map