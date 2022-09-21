import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})


export class OrderDetailsComponent implements OnInit {
  order: Order;
  selectedStatus: string;
  currentOrderId: string;
  currentStatus: string;


  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.currentOrderId = params['id'];
        this.orderService.getOrder(params['id']).subscribe((order) => {
          this.currentStatus = order.status;
          this.order = order;
        })
      }
    })
  }


  onSelected(value: string) {
    this.selectedStatus = value;
  }


  onSave() {
    this.orderService
      .updateOrder({ status: this.selectedStatus }, this.currentOrderId)
      .subscribe();
    this.router.navigate(['/order']);
  }


  back() {
    this.router.navigate(['/order']);
  }
}
