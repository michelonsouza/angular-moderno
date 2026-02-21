import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserStoreService {
  readonly #state = signal<User | null>(null);

  public currentUser = computed(() => this.#state());

  public isLoggedIn = computed(() => this.#state() !== null);

  setUser(user: User | null) {
    this.#state.set(user);
  }

  getUser(): User | null {
    return this.#state();
  }

  logout() {
    this.#state.set(null);
  }
}
