import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  currentUserId;
  country = [];
  constructor(
    private formBuilder: FormBuilder,
    private routes: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      admin: [false],
      address: [''],
      city: [''],
      country: [''],
      coupan: ['']
    })
    this.checkEditMode();
  }


  private checkEditMode() {
    this.routes.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.userService.getUser(params['id']).subscribe((user) => {
          this.form.controls['name'].setValue(user.name);
          this.form.controls['email'].setValue(user.email);
          this.form.controls['phone'].setValue(user.phone);
          this.form.controls['admin'].setValue(user.admin);
          this.form.controls['address'].setValue(user.address);
          this.form.controls['country'].setValue(user.country);
          this.form.controls['city'].setValue(user.city);
          this.form.controls['password'].setValidators([]);
          this.form.controls['password'].updateValueAndValidity();
        })
      }
    })
  }


  private addUser(user: User) {
    this.userService.addUser(user).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/user-list']);
        })
    })
  }


  private updateUser(user: User) {
    this.userService.updateUser(user).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/user-list']);
        })
    })
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      admin: this.form.controls['admin'].value,
      address: this.form.controls['address'].value,
      country: this.form.controls['country'].value,
      city: this.form.controls['city'].value,
      password: this.form.controls['password'].value,
    }
    if (this.editMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }


  cancel() {
    this.router.navigate(['/user-list']);
  }
}
