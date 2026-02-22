import { inject, Injectable } from '@angular/core';
import { tap, switchMap, pipe } from 'rxjs';

import { UserCredentials } from '../interfaces/user-credentials';
import { AuthService } from '../services/auth.service';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { AuthTokenResponse } from '../interfaces/auth-token-response';

@Injectable({
  providedIn: 'root',
})
export class LoginFacadeService {
  readonly #authService = inject(AuthService);
  readonly #authTokenStorageService = inject(AuthTokenStorageService);
  readonly #loggedInUserStoreService = inject(LoggedInUserStoreService);

  public login(userCredentials: UserCredentials) {
    return this.#authService.login(userCredentials).pipe(this.#createUserSection());
  }

  public refreshToken(token: string) {
    return this.#authService.refreshToken(token).pipe(this.#createUserSection());
  }

  #createUserSection() {
    return pipe(
      tap((response: AuthTokenResponse | null) =>
        this.#authTokenStorageService.set(response?.token as string),
      ),
      switchMap(response => this.#authService.getCurrentUser(response?.token as string)),
      tap(user => this.#loggedInUserStoreService.setUser(user)),
    );
  }
}
