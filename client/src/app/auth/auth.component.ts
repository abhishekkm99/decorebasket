import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})


export class AuthComponent implements OnInit {
  userName: string = localStorage.getItem('userName');
  userId: string = localStorage.getItem('userId');


  constructor(
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}


  ngOnInit(): void {
  }


  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.cartService.emptyCart();
    this.wishlistService.emptyWishlist();
    this.router.navigate(['/home']);
  }

}
