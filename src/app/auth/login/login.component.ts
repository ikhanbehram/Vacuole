import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  loginForm: FormGroup = new FormGroup({
    userEmailFormControl: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    userPasswordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  loginFormSubmit() {
    console.log(this.loginForm.controls.userPasswordFormControl.errors);
    console.log(this.loginForm.controls.userEmailFormControl.errors);
  }
}
