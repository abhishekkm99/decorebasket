import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductCreateComponent } from './admin/product/product-create/product-create.component';
import { UserCreateComponent } from './admin/user/user-create/user-create.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { OrderListComponent } from './admin/order/order-list/order-list.component';
import { OrderDetailsComponent } from './admin/order/order-details/order-details.component';
import { AuthGuardService } from './admin/services/auth-guard.service';
import { AutGuardService } from './services/aut-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CouponListComponent } from './admin/coupon/coupon-list/coupon-list.component';
import { CreateCouponComponent } from './admin/coupon/create-coupon/create-coupon.component';
import { DiscountComponent } from './discount/discount.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'wishlist', component: WishlistComponent,canActivate:[AutGuardService] },
  { path: 'cart', component: CartComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'checkout', component: CheckoutComponent,canActivate: [AutGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuardService] },
  { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuardService] },
  { path: 'product-create/:id', component: ProductCreateComponent, canActivate: [AuthGuardService] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'user-create', component: UserCreateComponent, canActivate: [AuthGuardService] },
  { path: 'user-create/:id', component: UserCreateComponent, canActivate: [AuthGuardService] },
  { path: 'order', component: OrderListComponent, canActivate: [AuthGuardService] },
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuardService] },
  { path :'coupon-list', component: CouponListComponent, canActivate:[AuthGuardService]},
  { path :'coupon-create', component:CreateCouponComponent, canActivate:[AuthGuardService]},
  {path :'discount', component:DiscountComponent,canActivate:[AutGuardService]},
  { path: '**', redirectTo: 'home' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

