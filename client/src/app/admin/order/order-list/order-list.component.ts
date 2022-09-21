import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})


export class OrderListComponent implements OnInit {
  orders: Order[] = [];


  constructor(private orderService: OrderService, private router: Router) {}


  ngOnInit(): void {
    this.getOrders();
  }


  private getOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    })
  }


  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe((response) => {
      this.getOrders();
    })
  }


  showOrder(id: string) {
    this.router.navigateByUrl(`order/${id}`);
  }
}
