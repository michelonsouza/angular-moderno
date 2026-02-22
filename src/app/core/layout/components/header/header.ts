import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';

import { LogoutFacadeService } from '@/app/core/auth/facades/logout-facade.service';
import { LoggedInUserStoreService } from '@/app/core/auth/stores/logged-in-user-store.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink, MatAnchor, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly #router = inject(Router);
  readonly #logoutFacadeService = inject(LogoutFacadeService);
  readonly #loggedInUserStoreService = inject(LoggedInUserStoreService);

  protected readonly isLoggedIn = computed(this.#loggedInUserStoreService.isLoggedIn);

  public logout() {
    console.log({ logout: 'start' });
    this.#logoutFacadeService.logout().subscribe({
      next: () => {
        this.#router.navigate(['/auth/login']);
      },
    });
  }
}
