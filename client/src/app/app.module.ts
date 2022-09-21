import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';;
import {MatCardModule} from '@angular/material/card'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
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
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { JwtInterceptor } from './admin/services/jwt.interceptor';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './search/search.component';
import { CouponListComponent } from './admin/coupon/coupon-list/coupon-list.component';
import { CreateCouponComponent } from './admin/coupon/create-coupon/create-coupon.component';
import { DiscountComponent } from './discount/discount.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactUsComponent,
    WishlistComponent,
    CartComponent,
    LoginComponent,
    ProductsComponent,
    SignupComponent,
    AuthComponent,
    AdminLoginComponent,
    AdminComponent,
    ProductListComponent,
    ProductCreateComponent,
    UserCreateComponent,
    UserListComponent,
    OrderListComponent,
    OrderDetailsComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AdminNavbarComponent,
    ProductItemComponent,
    CheckoutComponent,
    SearchComponent,
    CouponListComponent,
    CreateCouponComponent,
    DiscountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }



