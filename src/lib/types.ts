export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  discountPrice: number;
  image?: string;
  Category: { name: string };
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface CartItem extends Product {
  quantity: number;
}
export interface Customer {
  name: string;
  email: string;
  address: string;
}
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}
export interface Order {
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
}
