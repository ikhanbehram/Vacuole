import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupSpinner: boolean = false;
  errorMsg!: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  signupForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  signupFormSubmit() {
    this.signupSpinner = true;
    if (!this.signupForm.valid) {
      this.signupSpinner = false;
      return;
    }
    const { userName, email, password } = this.signupForm.value;
    this.authService.signUp(userName, email, password).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['/browse', 'intro']);
        }
      },
      (err) => {
        this.signupSpinner = false;
        this.errorMsg = err.error.error.email[0];
      }
    );
  }
}
