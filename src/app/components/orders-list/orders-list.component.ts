import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { interval, retry, switchMap } from 'rxjs';
import { Order } from '../../shared/interfaces/Order';
import { OrderFilter } from '../../shared/interfaces/OrderFilter';
import { OrderService } from '../../shared/services/order.service';
import { OrdersFilterComponent } from './orders-filter/orders-filter.component';

@Component({
  selector: 'app-orders-list',
  imports: [
    MatTableModule,
    MatIconModule,
    OrdersFilterComponent,
    MatSort,
    MatSortModule,
  ],
  templateUrl: './orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private readonly _dataSource: Signal<Order[] | undefined> = toSignal(
    this._ordersService.orders
  );

  public readonly sortedDataSource = computed(() => {
    switch (this.sortValue().active) {
      case 'orderDate':
        return [
          ...(this._dataSource() || []).sort((a, b) =>
            this.sortValue().direction === 'asc'
              ? Date.parse(a.orderDate) - Date.parse(b.orderDate)
              : Date.parse(b.orderDate) - Date.parse(a.orderDate)
          ),
        ];
      case 'orderStatus':
        return [
          ...(this._dataSource() || []).sort((a, b) =>
            this.sortValue().direction === 'asc'
              ? a.orderStatus.localeCompare(b.orderStatus)
              : b.orderStatus.localeCompare(a.orderStatus)
          ),
        ];
      case 'orderTotal':
        return [
          ...(this._dataSource() || []).sort((a, b) =>
            this.sortValue().direction === 'asc'
              ? a.orderTotal - b.orderTotal
              : b.orderTotal - a.orderTotal
          ),
        ];

      default:
        return [...(this._dataSource() || [])];
    }
  });

  public readonly filter!: OrderFilter;

  public readonly sortValue = signal<Sort>({ active: '', direction: '' });

  public readonly error = this._ordersService.error;

  constructor() {
    interval(30000)
      .pipe(
        takeUntilDestroyed(),
        switchMap(() =>
          this._ordersService.getOrders(this.filter).pipe(retry(2))
        )
      )
      .subscribe();
  }

  selectCurrentOrder(order: Order): void {
    this._ordersService.currentOrder = order;
    this._router.navigate(['/orders', order.orderId]);
  }

  sortChange(e: Sort): void {
    this.sortValue.set(e);
  }

  tryFetchAgain(): void {
    this._ordersService.getOrders(this.filter).pipe(retry(2)).subscribe();
  }
}
