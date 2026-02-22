import { makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { provideAuth } from './auth/provide-auth';
import { setAuthTokenInterceptor } from './auth/interceptors/set-auth-token-interceptor';
import { provideSnackBar } from './provide-snack-bar';

export function provideCore() {
  return makeEnvironmentProviders([
    provideAuth(),
    provideHttpClient(withInterceptors([setAuthTokenInterceptor])),
    provideEnvironmentNgxMask({
      thousandSeparator: '.',
      decimalMarker: ',',
    }),
    provideSnackBar(),
  ]);
}
