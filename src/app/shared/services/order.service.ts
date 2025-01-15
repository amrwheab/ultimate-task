import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { getOrdersData } from '../Dummy/orders-dummy';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _orders = new BehaviorSubject<Order[]>(getOrdersData(10));
  private readonly _currentOrder = new BehaviorSubject<Order | null>(null);

  get orders(): Observable<Order[]> {
    return this._orders;
  }

  get currentOrder(): Observable<Order | null> {
    return this._currentOrder;
  }

  set currentOrder(order: Order) {
    this._currentOrder.next(order)
  }

  getOrders(): Observable<Order[]> {
    return of(getOrdersData(10)).pipe(tap((res) => this._orders.next(res)));
  }
}
