import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root',
})


export class OrderService {
  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>('http://localhost:3000/api/orders/');
  }

  getOrder(id: string) {
    return this.http.get<Order>(`http://localhost:3000/api/orders/${id}`);
  }

  addOrder(order: Order) {
    return this.http.post('http://localhost:3000/api/orders/', order);
  }

  updateOrder(orderStatus: { status: string }, orderId: string) {
    return this.http.put(`http://localhost:3000/api/orders/${orderId}`, orderStatus)
  }

  deleteOrder(id: string) {
    return this.http.delete(`http://localhost:3000/api/orders/${id}`);
  }

  getOrderNumber() {
    return this.http.get('http://localhost:3000/api/orders/get/count');
  }

  getTotalSale() {
    return this.http.get('http://localhost:3000/api/orders/get/totalsales');
  }
}
