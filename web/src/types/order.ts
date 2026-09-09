export type Customer = {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  
  export type OrderInput = {
    idempotencyKey: string;
    customer: Customer;
    items: {
      productId: string;
      quantity: number;
    }[];
  };
  
  export type Order = {
    id: string;
    orderNumber: string;
    customerName: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: {
      id: string;
      productId: string;
      title: string;
      price: number;
      quantity: number;
    }[];
  };