import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LogoutFacadeService } from '@core/auth/facades/logout-facade.service';

@Directive({
  selector: '[appLogout]',
  host: {
    '(click)': 'logout()',
  },
})
export class LogoutDirective {
  readonly #router = inject(Router);
  readonly #logoutFacadeService = inject(LogoutFacadeService);

  public logout() {
    this.#logoutFacadeService.logout().subscribe({
      next: () => {
        this.#router.navigate(['/auth/login']);
      },
    });
  }
}
