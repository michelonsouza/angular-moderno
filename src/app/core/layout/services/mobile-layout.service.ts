import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileLayoutService {
  readonly #breakpointObservier = inject(BreakpointObserver);

  public isMobile() {
    const matches = this.#breakpointObservier
      .observe('(max-width: 1200px)')
      .pipe(map(state => state.matches));

    return toSignal(matches, { requireSync: true });
  }
}
