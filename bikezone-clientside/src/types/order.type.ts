interface User {
  _id: string;
  fullName: string;
  email: string;
  isActive: boolean;
}

interface Product {
  _id: string;
  name: string;
  image: string;
}

interface Transaction {
  id: string;
  transactionStatus: string;
}

export type TOrder = {
  _id: string;
  orderQuantity?: number;
  user: User;
  product: Product;
  totalPrice: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled" | string; // Union of possible statuses
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
  transaction: Transaction;
};
