import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavVisibilityStore {
  readonly #state = signal(false);

  public isVisible = computed(() => this.#state());

  public toggle() {
    this.#state.update(state => !state);
  }

  public close() {
    this.#state.set(false);
  }
}
