import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  readonly #snackBar = inject(MatSnackBar);

  public success(message: string, action = 'OK') {
    return this.#snackBar.open(message, action, {
      panelClass: 'snack-bar-success-feedback',
    });
  }

  public error(message: string, action?: string) {
    return this.#snackBar.open(message, action, {
      panelClass: 'snack-bar-error-feedback',
    });
  }
}
