import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UsersService, private router: Router) { }
  ngOnInit(): void {
    this.getUsers();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((response) => {
      this.getUsers();
    })
  }

  updateUser(id: string) {
    this.router.navigateByUrl(`user-create/${id}`);
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }
}
