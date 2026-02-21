import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/guards/is-authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./core/layout/layout'),
    loadChildren: () => import('./features/home/routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/auth/components/layout/layout.component'),
    loadChildren: () => import('./core/auth/routes'),
  },
];
