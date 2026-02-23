import { Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LoggedInUserStoreService } from '@/app/core/auth/stores/logged-in-user-store.service';
import { SidenavVisibilityStore } from '@/app/core/layout/stores/sidenav-visibility.store';
import { LogoutDirective } from './directives/logout.directive';

@Component({
  selector: 'app-sidenav-items',
  imports: [RouterLink, RouterLinkActive, MatListModule, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  readonly #sidenavVisibilityStore = inject(SidenavVisibilityStore);
  readonly #loggedInUserStoreService = inject(LoggedInUserStoreService);

  protected readonly isLoggedIn = computed(this.#loggedInUserStoreService.isLoggedIn);

  readonly links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);

  public closeSidenav() {
    this.#sidenavVisibilityStore.close();
  }
}
