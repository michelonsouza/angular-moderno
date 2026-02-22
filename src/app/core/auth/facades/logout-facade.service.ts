import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutFacadeService {
  readonly #authService = inject(AuthService);
  readonly #authLocalStorageService = inject(AuthTokenStorageService);
  readonly #loggedInUserStoreService = inject(LoggedInUserStoreService);

  public logout() {
    return this.#authService.logout().pipe(
      tap(() => this.#authLocalStorageService.remove()),
      tap(() => this.#loggedInUserStoreService.logout()),
    );
  }
}
