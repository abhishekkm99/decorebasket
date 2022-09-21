import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  userName: string = localStorage.getItem('userName');


  constructor(cartService: CartService, wishlistService: WishlistService) {
    cartService.cartLocalStorage();
    wishlistService.wishlistLocalStorage();
  }


  ngOnInit(): void { }

}
