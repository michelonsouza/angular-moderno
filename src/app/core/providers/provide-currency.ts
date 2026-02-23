import { DEFAULT_CURRENCY_CODE, Provider } from '@angular/core';

export function provideCurrency(): Provider {
  return {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL',
  };
}
