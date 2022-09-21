import { OrderItem } from "./order-item";


export interface Order {
  id?: string;
  orderItem?: OrderItem[];
  shippingAddress?: string;
  city?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: number;
  user?: any;
  dateOrdered?: string;
}
