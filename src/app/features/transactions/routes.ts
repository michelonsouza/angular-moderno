import { Routes } from '@angular/router';

import { getTransacionByIdResolver } from './pages/create-or-edit/resolvers/get-transacion-by-id-resolver';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'create/new',
    loadComponent: () =>
      import('./pages/create-or-edit/create-or-edit.component').then(m => m.CreateOrEditComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/create-or-edit/create-or-edit.component').then(m => m.CreateOrEditComponent),
    resolve: {
      transaction: getTransacionByIdResolver,
    },
  },
];

export default routes;
