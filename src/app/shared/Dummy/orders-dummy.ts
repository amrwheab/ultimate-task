import { OrderStatus } from '../Enums/order-status.enum';
import { Order } from '../interfaces/Order';

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

export const getOrdersData = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const randomCustomer =
      customers[Math.floor(Math.random() * customers.length)];
    const randomStatus =
      Object.values(OrderStatus)[
        Math.floor(Math.random() * Object.values(OrderStatus).length)
      ];
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
    const orderTotal = orderItems.reduce(
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

    return {
      orderId: generateOrderId(index),
      customerName: randomCustomer,
      orderStatus: randomStatus,
      orderTotal: orderTotal,
      orderDate,
      items: orderItems,
    };
  });
