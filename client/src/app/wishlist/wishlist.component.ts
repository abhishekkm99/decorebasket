import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductsService } from '../admin/services/products.service';
import { cartItemDetail } from '../models/cart';
import { WishlistService } from '../services/wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})


export class WishlistComponent implements OnInit {
  cartItems: cartItemDetail[] = [];
  endSubs: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getWishlistDetails();
  }


  private getWishlistDetails() {
    this.wishlistService.wishlist
      .subscribe((res) => {
        this.cartItems = [];
        res.wishlistItem.forEach((cartItem) => {
          this.productService
            .getProduct(cartItem.productId)
            .subscribe((product) => {
              this.cartItems.push({
                product: product,
                quantity: 1
              })
            })
        })
      })
  }


  back() {
    this.router.navigate(['/home']);
  }


  delete(item: cartItemDetail) {
    this.wishlistService.deleteWishistItem(item.product.id);
  }
}
