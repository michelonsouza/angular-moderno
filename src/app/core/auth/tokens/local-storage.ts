import { InjectionToken } from '@angular/core';

export const LocalStgorageToken = new InjectionToken<Storage>('Local Storage', {
  providedIn: 'root',
  factory: () => window?.localStorage,
});
