import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root',
})


export class AuthService {
  private authStatusListener = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}


  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:3000/api/users/login', {
      email: email,
      password: password,
    })
  }


  signup(data:any) :Observable<any> {
    return this.http.post('http://localhost:3000/api/users/register', data);
  }


  logout() {
    this.localstorageService.removeToken();
    this.router.navigate(['/admin-login']);
  }


  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
}
