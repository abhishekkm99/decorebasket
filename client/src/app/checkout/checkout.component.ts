import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../admin/models/order';
import { OrderItem } from '../admin/models/order-item';
import { OrderService } from '../admin/services/order.service';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})


export class CheckoutComponent implements OnInit {
  isSubmitted = false;
  form: FormGroup;
  orderItems: OrderItem[] = [];
  userId: string = localStorage.getItem('userId');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    })
    this.getCartItems();
  }


  private getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    })
  }


  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const order: Order = {
      orderItem: this.orderItems,
      shippingAddress: this.form.controls['address'].value,
      city: this.form.controls['city'].value,
      country: this.form.controls['country'].value,
      phone: this.form.controls['phone'].value,
      // status: 'Pending',
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    }

    this.orderService.addOrder(order).subscribe((order) => {
      this.cartService.emptyCart();
      this.router.navigate(['/cart']);
    })
  }

}
