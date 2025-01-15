import { OrderStatus } from "../Enums/order-status.enum"

export interface OrderFilter {
  status: OrderStatus
  total: number
  comparison: '1' | '0'
}
