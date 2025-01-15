import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { getOrdersData } from '../Dummy/orders-dummy';
import { Order } from '../interfaces/Order';
import { OrderFilter } from '../interfaces/OrderFilter';
import { OrderStatus } from '../Enums/order-status.enum';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  initialFilter: OrderFilter = {
    status: OrderStatus.All,
    total: 0,
    comparison: '1',
  };

  private readonly _orders = new BehaviorSubject<Order[]>(
    getOrdersData(10, this.initialFilter)
  );
  private readonly _currentOrder = new BehaviorSubject<Order | null>(null);

  get orders(): Observable<Order[]> {
    return this._orders;
  }

  get currentOrder(): Observable<Order | null> {
    return this._currentOrder;
  }

  set currentOrder(order: Order) {
    this._currentOrder.next(order);
  }

  getOrders(filter: OrderFilter): Observable<Order[]> {
    return of(getOrdersData(10, filter)).pipe(
      tap((res) => this._orders.next(res))
    );
  }
}
