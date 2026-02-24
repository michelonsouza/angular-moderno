import { Routes } from '@angular/router';

import { getTransactionsResolver } from './resolvers/get-transactions-resolver';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    resolve: {
      transactions: getTransactionsResolver,
    },
  },
];

export default routes;
