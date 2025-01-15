import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { OrderService } from './shared/services/order.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Order } from './shared/interfaces/Order';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatTableModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _ordersService = inject(OrderService);

  public readonly displayedColumns: string[] = [
    'orderId',
    'customerName',
    'orderDate',
    'orderStatus',
    'orderTotal',
  ];

  dataSource: Signal<Order[] | undefined> = toSignal(
    this._ordersService.orders
  );

  constructor() {
    interval(30000)
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => this._ordersService.getOrders())
      )
      .subscribe();
  }
}
