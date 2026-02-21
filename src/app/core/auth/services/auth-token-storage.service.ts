import { inject, Injectable } from '@angular/core';
import { LocalStgorageToken } from '../tokens/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorageService {
  readonly #key = '@app:auth-token';

  readonly #localStorageToken = inject(LocalStgorageToken);

  set(token: string) {
    this.#localStorageToken.setItem(this.#key, token);
  }

  get() {
    return this.#localStorageToken.getItem(this.#key);
  }

  remove() {
    this.#localStorageToken.removeItem(this.#key);
  }

  has() {
    return !!this.#localStorageToken.getItem(this.#key);
  }
}
