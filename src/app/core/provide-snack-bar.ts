import { Provider } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

export function provideSnackBar(): Provider {
  return {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    } as MatSnackBarConfig,
  };
}
