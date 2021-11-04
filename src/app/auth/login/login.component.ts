import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

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
    if (!this.loginForm.valid) {
      return;
    }
    let email: string = this.loginForm.value.userEmailFormControl;
    let password: string = this.loginForm.value.userPasswordFormControl;
    this.authService.logIn(email, password).subscribe((responseObj) => {
      this.router.navigate(['/browse', 'intro']);
    });
    // this.loginForm.reset();
  }
}
