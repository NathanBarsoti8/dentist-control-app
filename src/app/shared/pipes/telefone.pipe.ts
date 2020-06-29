import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {

    transform(value: any): any {
        let phone = value

        if (phone.length == '8') {
            return landline(phone)
        } 
        else if (phone.length == '9') {
            return mobile(phone)
        }
        else {
            return 'Não declarado'
        }

        function landline(value?: string): string {
            return `${value.substr(0, 4)}-${value.substr(4, 4)}`
        }

        function mobile(value?: string): string {
            return `${value.substr(0, 5)}-${value.substr(5, 4)}`
        }
    }

}