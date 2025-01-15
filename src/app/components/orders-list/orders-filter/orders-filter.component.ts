import { Component, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { retry, take } from 'rxjs';
import { OrderFilter } from '../../../shared/interfaces/OrderFilter';
import { OrderService } from '../../../shared/services/order.service';
import { OrderStatus } from './../../../shared/Enums/order-status.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders-filter',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './orders-filter.component.html',
})
export class OrdersFilterComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _ordersService = inject(OrderService);
  public readonly filter = input<OrderFilter>();
  public readonly filterChange = output<OrderFilter>();

  public readonly orderStatus = Object.values(OrderStatus).slice(1);

  public readonly form = this._fb.group({
    status: '',
    total: 0,
    comparison: '1',
  });

  applyFilter(): void {
    this.filterChange.emit(this.form.value as OrderFilter);
    this._ordersService
      .getOrders(this.form.value as OrderFilter)
      .pipe(retry(2), take(1))
      .subscribe();
  }

  reset(): void {
    this.form.patchValue({
      status: '',
      total: 0,
      comparison: '1',
    })

    this.applyFilter()
  }
}
