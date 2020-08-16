import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DateConverterService {

    constructor() { }

    convertStringToDate(date: string): Date {
        let day = date.slice(0, 2)
        let month = date.slice(2, 4)
        let year = date.slice(4, 8)

        return new Date(`${year}-${month}-${day}`);
    }

    formatStringManually(date: string): string {
        date = date.replace('/', '');
        date = date.replace('/', '');

        let day = date.slice(0, 2)
        let month = date.slice(2, 4)
        let year = date.slice(4, 8)

        return `${year}-${month}-${day}`;
    }

    dateFormat(date: Date): string {
        let day = '' + date.getDate();
        let month = '' + (date.getMonth() + 1);
        let year = date.getFullYear();

        if (parseInt(day) < 10)
            day = `0${day}`

        if (parseInt(month) < 10)
            month = `0${month}`

        return [year, month, day].join('-');
    }

    formatHour(hour: string): string {
        if (hour.length == 4) {
            let format = Math.floor(hour.length / 2);

            return hour.substr(0, format) + ":" + hour.substr(format);
        }
        else
            return hour;
    }

}
