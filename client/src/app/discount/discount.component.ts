import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../admin/models/coupon';
import { CouponService } from '../admin/services/coupon.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
})
export class DiscountComponent implements OnInit {
  coupons: Coupon[] = [];

  constructor(
    private couponService: CouponService,
    private router: Router,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.showCoupon();
  }
  private showCoupon() {
    this.couponService.getCoupon().subscribe((coupons) => {
      this.coupons = coupons;
    });
  }

  copy(v: string) {
    this.clipboard.copy(v);
  }
}
