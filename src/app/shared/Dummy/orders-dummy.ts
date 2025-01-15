import { OrderStatus } from '../Enums/order-status.enum';
import { Order } from '../interfaces/Order';
import { OrderFilter } from '../interfaces/OrderFilter';

const generateOrderId = (index: number): string =>
  `ORD${(index + 1).toString().padStart(3, '0')}`;

const customers = [
  'Alice Johnson',
  'Bob Smith',
  'Clara White',
  'David Green',
  'Emma Brown',
  'George Davis',
  'Hannah Lewis',
  'Irene King',
  'Jack Scott',
  'Karen Adams',
  'Liam Mitchell',
  'Mona Lee',
  'Nina Harris',
  'Oliver Clark',
  'Paul Walker',
  'Quincy Moore',
  'Rachel Walker',
  'Samuel King',
  'Tina Evans',
  'Ursula Wright',
  'Vera Morgan',
  'Walter Cooper',
  'Xander Carter',
  'Yvonne Nelson',
  'Zachary Hall',
];

const products = [
  { productName: 'Laptop', price: 1000 },
  { productName: 'Smartphone', price: 700 },
  { productName: 'Headphones', price: 150 },
  { productName: 'Keyboard', price: 50 },
  { productName: 'Mouse', price: 20 },
  { productName: 'Monitor', price: 250 },
  { productName: 'Charger', price: 25 },
  { productName: 'Webcam', price: 60 },
  { productName: 'Speakers', price: 80 },
  { productName: 'Tablet', price: 300 },
];

export const getOrdersData = (length: number, filter: OrderFilter) => {
  return Array.from({ length }, (_, index) => {
    const randomCustomer =
      customers[Math.floor(Math.random() * customers.length)];

    let randomStatus: OrderStatus = OrderStatus.All;

    if (filter && filter.status) {
      randomStatus = filter.status as OrderStatus;
    } else {
      randomStatus =
        Object.values(OrderStatus)[
          Math.floor(Math.random() * (Object.values(OrderStatus).length - 1) + 1)
        ];
    }

    const numItems = Math.floor(Math.random() * 3) + 1;
    const orderItems = Array.from({ length: numItems }, () => {
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      return {
        productName: randomProduct.productName,
        quantity,
        price: randomProduct.price,
      };
    });

    let orderTotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const orderDate = new Date(
      2025,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    )
      .toISOString()
      .split('T')[0];

    if (filter.total && filter.comparison) {
      if (filter.comparison === '1' && orderTotal <= filter.total) {
        orderTotal = filter.total + Math.floor(Math.random() * 100) + 1;
      } else if (filter.comparison === '0' && orderTotal >= filter.total) {
        orderTotal = filter.total - Math.floor(Math.random() * 100) - 1;
      }
    }

    return {
      orderId: generateOrderId(index),
      customerName: randomCustomer,
      orderStatus: randomStatus,
      orderTotal: Math.max(0, orderTotal),
      orderDate,
      items: orderItems,
    };
  });
};
