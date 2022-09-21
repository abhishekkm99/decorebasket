import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../admin/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})


export class SignupComponent implements OnInit {
  form: FormGroup;
  message: string = '';
  className = 'd-none';
  isProcessing = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      country: ['']
    })
  }


  ngOnInit(): void { }


  signup() {
    this.isProcessing = true;
    if (this.form.invalid) return;
    const data = this.form.value;
    console.log(data);
    delete data['confirm'];
    this.auth.signup(data).subscribe((res) => {
      if (res) {
        this.isProcessing = false;
        this.message = 'Account created';
        this.className = 'aler alert-success';
        this.router.navigate(['/login']);
      }
    }, (err) => {
      if (err.status == 409) {
        this.isProcessing = false;
        this.message = 'Email already exists';
        this.className = 'aler alert-danger';
      } else {
        this.isProcessing = false;
        this.message = 'server error';
        this.className = 'aler alert-danger';
      }
    })
  }


  getClassName() {
    return this.className;
  }
}
