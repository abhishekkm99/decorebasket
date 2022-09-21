import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { LocalstorageService } from '../admin/services/localstorage.service';


@Injectable({
  providedIn: 'root',
})


export class AutGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localstorageService.getToken();


    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if ((decodedToken.admin || !decodedToken.admin) && !this.checkTokenExpire(decodedToken.exp)) {
        return true;
      }
    }


    this.router.navigate(['/login']);
    return false;
  }


  private checkTokenExpire(ex) {
    return Math.floor(new Date().getTime() / 1000) >= ex;
  }
}
