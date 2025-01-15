import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { map } from 'rxjs';
import { Order } from '../../shared/interfaces/Order';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-order-details',
  imports: [AsyncPipe, CurrencyPipe, MatTableModule],
  templateUrl: './order-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {
  private readonly _ordersService = inject(OrderService);
  private readonly _route = inject(ActivatedRoute);

  public readonly orders: Signal<Order[] | undefined> = toSignal(
    this._ordersService.orders
  );
  public readonly params = toSignal<Params>(this._route.params);
  currentOrder$ = this._ordersService.currentOrder.pipe(
    map(
      (order) =>
        order ??
        this.orders()?.find(({ orderId }) => orderId === this.params()!['id'])
    )
  );

  public readonly displayedColumns: string[] = [
    'productName',
    'quantity',
    'price',
  ];
}
