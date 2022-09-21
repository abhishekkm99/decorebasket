import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductsService } from '../admin/services/products.service';
import { cartItemDetail } from '../models/cart';
import { CartService } from '../services/cart.service';
import {CouponService} from '../admin/services/coupon.service'
import { Coupon } from '../admin/models/coupon';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  cartItems: cartItemDetail[] = [];
  endSubs: Subject<any> = new Subject();
  totalPrice: number;
  coupCode: string;
  reset:number=0;
  number: string[]
  coupons: Coupon[] = [];
  ids: string[]

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService,
    private couponService: CouponService,
  ) { }


  ngOnInit(): void {
    this.getCartDetails();
    this.getTotalPrice();
    this.getcouponfrombackend();
  }


  private getCartDetails() {
    this.cartService.cart.subscribe((res) => {
      this.cartItems = [];
      res.items.forEach((cartItem) => {
        this.productService
          .getProduct(cartItem.productId)
          .subscribe((product) => {
            this.cartItems.push({
              product: product,
              quantity: cartItem.quantity,
            })
          })
      })
    })
  }

  private getcouponfrombackend(){
    this.couponService.getCoupon().subscribe((coupons) => {
      this.coupons = coupons;
    });

  }

  getTotalPrice() {
    this.cartService.cart.subscribe((cart) => {
    this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.productService
            .getProduct(item.productId)
            .subscribe((product) => {
              this.totalPrice = this.totalPrice+(product.price * item.quantity);
            })
        })
      }
    })
  }


  updateQuantity(event, item) {
    this.cartService.setCartItem(
      {
        productId: item.product.id,
        quantity: event.target.value
      },
      true
    )
  }


  onCheckout() {
    this.router.navigate(['/checkout']);
  }


  back() {
    this.router.navigate(['/home']);
  }


  delete(item: cartItemDetail) {
    this.cartService.deleteCartItem(item.product.id);
  }
  storecoupon(){
    this.ids = this.coupons.map((obj) => obj.couponCode);
// console.log(this.ids,"....");
// console.log(this.coupCode)
for(let i=0; i<this.ids.length;i++){
  if( this.coupCode==this.ids[i]){
    this.number =this.coupCode.match(/(\d+)/)
    this.totalPrice=this.totalPrice+ this.reset;
    // console.log(this.number,"......")
    if(this.number){
      let num = +this.number[0];
      {
        this.totalPrice= this.totalPrice-num;
        this.reset=num;
      }
    }
  }

}


  }
}
