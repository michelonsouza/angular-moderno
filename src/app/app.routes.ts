import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout'),
    loadChildren: () => import('./features/home/routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/auth/components/layout/layout.component'),
    loadChildren: () => import('./core/auth/routes'),
  },
];
