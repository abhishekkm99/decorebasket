import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../admin/services/auth.service';
import { LocalstorageService } from '../admin/services/localstorage.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})


export class AdminLoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  authError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const loginData = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    }
    this.authService.login(loginData.email, loginData.password).subscribe(
      (user) => {
        console.log(user);
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/admin']);
      },
      (error) => {
        this.authError = true;
      }
    )
  }
}
