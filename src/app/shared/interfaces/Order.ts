import { OrderStatus } from "../Enums/order-status.enum";

export interface Order {
  orderId: string;
  customerName: string;
  orderStatus: OrderStatus;
  orderTotal: number;
  orderDate: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
}
