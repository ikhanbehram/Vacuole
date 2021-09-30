import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  signupForm: FormGroup = new FormGroup({
    userNameFormControl: new FormControl('', [Validators.required]),
    userEmailFormControl: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    userPasswordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  signupFormSubmit() {}
}
