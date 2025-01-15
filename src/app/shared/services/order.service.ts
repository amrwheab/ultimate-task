import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { getOrdersData } from '../Dummy/orders-dummy';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _orders = new BehaviorSubject<Order[]>(getOrdersData(10));

  get orders(): Observable<Order[]> {
    return this._orders;
  }

  getOrders(): Observable<Order[]> {
    return of(getOrdersData(10)).pipe(tap((res) => this._orders.next(res)));
  }
}
