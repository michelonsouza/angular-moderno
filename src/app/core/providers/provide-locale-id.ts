import { LOCALE_ID, Provider } from '@angular/core';

export function provideLocaleId(): Provider {
  return {
    provide: LOCALE_ID,
    useValue: 'pt-BR',
  };
}
