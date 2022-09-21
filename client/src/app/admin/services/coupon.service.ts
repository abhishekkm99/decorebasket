
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  createCoupon(coupon:{}){
    return this.http.post<Coupon>('http://localhost:3000/api/coupon/', coupon);
  }

  getCoupon(){
    return this.http.get<Coupon[]>('http://localhost:3000/api/coupon/');
  }
  deleteCoupon(id: string){
    return this.http.delete(`http://localhost:3000/api/coupon/${id}`);
  }


}
