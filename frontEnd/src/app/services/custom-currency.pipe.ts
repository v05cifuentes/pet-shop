import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    // Redondear el valor al número entero más cercano
    const roundedValue = Math.round(value);

    // Convertir el valor a una cadena y quitar los decimales ".00"
    return '$' + roundedValue.toString();
  }
}
