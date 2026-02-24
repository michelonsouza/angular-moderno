import { formatCurrency } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

const suffixes = ['K', 'M', 'B', 'T', 'Q', 'Q', 'S', 'O', 'N', 'D'];

@Pipe({
  name: 'humanizeCurrency',
})
export class HumanizeCurrencyPipe implements PipeTransform {
  readonly #currencyCode = inject(DEFAULT_CURRENCY_CODE);
  readonly #localeId = inject(LOCALE_ID);

  transform(value: number): string {
    const formattedValue = formatCurrency(
      value,
      this.#localeId,
      this.#getCurrencySymbol(),
      this.#currencyCode,
    );

    const splittedValue = formattedValue.split('.');

    if (splittedValue.length === 1) {
      return formattedValue;
    }

    const formatted = this.#formatValueWithSuffix(splittedValue);

    return formatted;
  }

  #formatValueWithSuffix(splittedValue: string[]) {
    const suffix = this.#getSuffix(splittedValue);
    const [firstValue, secondValue] = splittedValue;

    const firstCharOfSecondValue = secondValue.charAt(0);

    if (firstCharOfSecondValue === '0') {
      return `${firstValue}${suffix}`;
    }

    return `${firstValue}.${firstCharOfSecondValue}${suffix}`;
  }

  #getCurrencySymbol() {
    const { value } = new Intl.NumberFormat(this.#localeId, {
      style: 'currency',
      currency: this.#currencyCode,
    })
      .formatToParts()
      .find(part => part.type === 'currency')!;

    return value;
  }

  #getSuffix(splittedValue: string[]) {
    const suffix = suffixes[splittedValue.length - 2] || 'K';

    return suffix;
  }
}
