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

}
