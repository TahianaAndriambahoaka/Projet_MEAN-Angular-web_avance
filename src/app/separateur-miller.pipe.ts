import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separateurMiller'
})
export class SeparateurMillerPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString();
  }

}
