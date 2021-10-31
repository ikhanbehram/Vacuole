import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseurl: string
  ) {}

  logIn(email: string, password: string) {
    console.log(email, password);
    this.http
      .post(`${this.baseurl}/login`, { email: email, password: password })
      .subscribe((form) => {
        console.log(form);
      });
  }
}
