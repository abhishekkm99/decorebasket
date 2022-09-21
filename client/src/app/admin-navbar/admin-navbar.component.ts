import { Component, OnInit } from '@angular/core';
import { AuthService } from '../admin/services/auth.service';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})


export class AdminNavbarComponent implements OnInit {


  constructor(private authService: AuthService) { }


  ngOnInit(): void {
  }


  logoutUser() {
    this.authService.logout();
  }
}
