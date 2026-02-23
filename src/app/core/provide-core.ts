import { makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { provideAuth } from './auth/provide-auth';
import { setAuthTokenInterceptor } from './auth/interceptors/set-auth-token-interceptor';
import { provideSnackBar } from './providers/provide-snack-bar';
import { provideCurrency } from './providers/provide-currency';
import { provideLocaleId } from './providers/provide-locale-id';

registerLocaleData(ptBr);

export function provideCore() {
  return makeEnvironmentProviders([
    provideAuth(),
    provideHttpClient(withInterceptors([setAuthTokenInterceptor])),
    provideEnvironmentNgxMask({
      thousandSeparator: '.',
      decimalMarker: ',',
    }),
    provideSnackBar(),
    provideCurrency(),
    provideLocaleId(),
  ]);
}
