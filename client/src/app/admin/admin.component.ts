import { Component, OnInit } from '@angular/core';
import { OrderService } from './services/order.service';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  totalOrders = 0;
  totalProducts = 0;
  totalUsers = 0;
  totalSales = 0;


  constructor(
    private orderService: OrderService,
    private userService: UsersService,
    private productService: ProductsService
  ) {}


  ngOnInit(): void {
    this.orderService.getOrderNumber().subscribe((orders) => {
      this.totalOrders = orders['orderCount'];
    })

    this.userService.getUserNumber().subscribe((users) => {
      this.totalUsers = users['userCount'];
    })

    this.productService.getProductNumber().subscribe((products) => {
      this.totalProducts = products['productCount'];
    })

    this.orderService.getTotalSale().subscribe((sale) => {
      this.totalSales = sale['totalsales'];
    })
  }
}
