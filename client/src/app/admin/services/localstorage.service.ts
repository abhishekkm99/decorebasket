import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalstorageService {

  constructor() {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUSerId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  setUserName(name: string) {
    localStorage.setItem('userName', name);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
