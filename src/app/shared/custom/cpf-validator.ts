import { FormControl } from '@angular/forms';

export class CpfValidator {
    static validate(control: FormControl) {
        let cpf = control.value;
        let numbers = [];
        let digit = 0;
        cpf = cpf.replace(".", "").replace("-", "");

        if (cpf.length == 11) {
            if (cpf == "12345678909")
                return { 'invalidCPF': true };

            for (let i = 0; i < 11; i++)
                numbers[i] = Number(cpf[i]);

            while (digit < 2) {
                let sum = 0;
                for (let i = 8 + digit, j = 2; i > -1; i--, j++)
                    sum += numbers[i] * j;
                let rest = sum % 11;

                if (rest == 1 || rest == 0) {
                    if (numbers[9 + digit] != 0)
                        return { 'invalidCPF': true };
                }
                else
                    if (numbers[9 + digit] != 11 - rest)
                        return { 'invalidCPF': true };

                if (digit == 1)
                    return null;

                digit++;
            }
        }
        return { 'invalidCPF': true };
    }
}
