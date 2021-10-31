import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

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
    let email: string = this.loginForm.value.userEmailFormControl;
    let password: string = this.loginForm.value.userPasswordFormControl;
    this.authService.logIn(email, password);
  }
}
