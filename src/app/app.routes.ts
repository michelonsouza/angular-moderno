import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/guards/is-authenticated-guard';
import { isNotAuthenticatedGuard } from './core/auth/guards/is-not-authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./core/layout/layout'),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/routes'),
      },
      {
        path: 'transactions',
        loadChildren: () => import('./features/transactions/routes'),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadComponent: () => import('./core/auth/components/layout/layout.component'),
    loadChildren: () => import('./core/auth/routes'),
  },
];
