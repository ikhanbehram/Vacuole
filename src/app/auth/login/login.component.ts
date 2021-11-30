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
  loginSpinner: boolean = false;
  errorMsg!: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  loginFormSubmit() {
    this.loginSpinner = true;
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.logIn(email, password).subscribe(
      (responseObj) => {
        if (responseObj) {
          this.router.navigate(['/browse', 'intro']);
        }
      },
      (err) => {
        this.loginSpinner = false;
        this.errorMsg = err.error.error;
      }
    );
    // this.loginForm.reset();
  }
}
