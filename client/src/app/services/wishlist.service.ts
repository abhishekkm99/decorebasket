import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Wishlist } from '../models/cart';


@Injectable({
  providedIn: 'root',
})


export class WishlistService {
  wishlist: BehaviorSubject<Wishlist> = new BehaviorSubject(this.getWishlist());


  constructor() { }

  wishlistLocalStorage() {
    const cart: Wishlist = this.getWishlist();
    if (!cart) {
      const initialCart = { wishlistItem: [] };
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem('wishlist', initialCartJson);
    }
  }


  setWishlistItem(cartItem: CartItem): Wishlist {
    const cart = this.getWishlist();
    const cartItemExist = cart.wishlistItem.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.wishlistItem.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
          return item;
        }
      })
    } else {
      cart.wishlistItem.push(cartItem);
    }


    const cartJson = JSON.stringify(cart);
    localStorage.setItem('wishlist', cartJson);
    this.wishlist.next(cart);
    return cart;
  }


  getWishlist(): Wishlist {
    const cartJsonString: string = localStorage.getItem('wishlist');
    const cart: Wishlist = JSON.parse(cartJsonString);
    return cart;
  }


  emptyWishlist() {
    const initialCart = { wishlistItem: [] };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem('cart', initialCartJson);
    this.wishlist.next(initialCart);
  }


  deleteWishistItem(id: string) {
    const cart = this.getWishlist();
    const newCart = cart.wishlistItem.filter((item) => item.productId !== id);
    cart.wishlistItem = newCart;
    const cartJson = JSON.stringify(cart);
    localStorage.setItem('wishlist', cartJson);
    this.wishlist.next(cart);
  }
}
