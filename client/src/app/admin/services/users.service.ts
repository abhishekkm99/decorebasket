import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/api/users/');
  }

  getUser(id: string) {
    return this.http.get<User>(`http://localhost:3000/api/users/${id}`);
  }

  addUser(user: User) {
    return this.http.post('http://localhost:3000/api/users/', user);
  }

  updateUser(user: User) {
    return this.http.put(`http://localhost:3000/api/users/${user.id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`http://localhost:3000/api/users/${id}`);
  }

  getUserNumber() {
    return this.http.get('http://localhost:3000/api/users/get/count');
  }
}
