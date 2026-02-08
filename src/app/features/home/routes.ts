import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home),
  }
];

export default routes;
