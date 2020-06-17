import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value) {
    let cpf = value

    if (cpf) {
      return cpfPoints(cpf)
    } else {
      return 'Não declarado'
    }

    function cpfPoints(value?: string): string {
      return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`
    }
  }

}