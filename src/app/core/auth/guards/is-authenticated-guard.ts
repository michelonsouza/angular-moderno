import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';

export const isAuthenticatedGuard: CanActivateFn = (_route, state) => {
  const loggedInUserStoreService = inject(LoggedInUserStoreService);

  if (loggedInUserStoreService.isLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  const urlTree = router.parseUrl('/auth/login');

  return new RedirectCommand(urlTree, { state: { redirectUrl: state.url } });
};
