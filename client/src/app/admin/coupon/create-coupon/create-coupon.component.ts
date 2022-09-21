import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';

import { timer } from 'rxjs';
@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css'],
})
export class CreateCouponComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private couponService: CouponService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      couponName: ['', Validators.required],
      couponCode: ['', Validators.required],
      couponValue: ['', Validators.required],
      minPurchase: ['', Validators.required],
    });
    // this.checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const couponFormData = {};
    couponFormData['couponName']= this.form.get('couponName').value;
    couponFormData['couponCode']= this.form.get('couponCode').value;
    couponFormData['couponValue']= this.form.get('couponValue').value;
    couponFormData['minPurchase']= this.form.get('minPurchase').value;
    this.addCoupon(couponFormData);
  }
  private addCoupon(coupon:{}) {
    this.couponService.createCoupon(coupon).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/coupon-list']);
        })
    })
  }
}
