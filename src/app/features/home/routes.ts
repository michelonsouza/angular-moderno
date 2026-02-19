import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent),
  },
];

export default routes;
