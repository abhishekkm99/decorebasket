
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../../models/coupon';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  coupons : Coupon[] = [];

  constructor(private couponService : CouponService,
    private router: Router) { }

  ngOnInit(): void {
    this.showCoupon();
  }

  private showCoupon() {
    this.couponService.getCoupon().subscribe((coupons) => {
      this.coupons = coupons;
    })
  }
  delCoupon(id :string){
    this.couponService.deleteCoupon(id).subscribe((response)=>{
      this.showCoupon();
    })
  }

}
