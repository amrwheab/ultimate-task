import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/orders-list/orders-list.component').then(
        (c) => c.OrdersListComponent
      ),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./components/order-details/order-details.component').then(
        (c) => c.OrderDetailsComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'orders',
  },
];
