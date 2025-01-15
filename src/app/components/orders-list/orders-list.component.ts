import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { interval, retry, switchMap } from 'rxjs';
import { Order } from '../../shared/interfaces/Order';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-orders-list',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent {
  private readonly _ordersService = inject(OrderService);
  private readonly _router = inject(Router);

  public readonly displayedColumns: string[] = [
    'orderId',
    'customerName',
    'orderDate',
    'orderStatus',
    'orderTotal',
    'action',
  ];

  public readonly dataSource: Signal<Order[] | undefined> = toSignal(
    this._ordersService.orders
  );

  constructor() {
    interval(30000)
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => this._ordersService.getOrders().pipe(retry(2)))
      )
      .subscribe();
  }

  selectCurrentOrder(order: Order): void {
    this._ordersService.currentOrder = order;
    this._router.navigate(['/orders', order.orderId]);
  }
}
