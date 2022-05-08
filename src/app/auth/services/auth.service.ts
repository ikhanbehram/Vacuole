import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/User.interface';

interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  private _token!: string;
  user!: User;
  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseurl: string
  ) {}

  get token() {
    return this._token;
  }

  signUp(userName: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `${this.baseurl}/register`,
        {
          name: userName,
          email: email,
          password: password,
        },
        {
          headers: new HttpHeaders({
            Accept: 'application/json',
          }),
        }
      )
      .pipe(
        map((resData) => {
          const responseObj = {
            token: resData.data.token,
            user: resData.data.user,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this._token = responseObj.token;
          this.user = responseObj.user;
          localStorage.setItem('token', this.token);
          this.isAuthenticated.next(true);
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `${this.baseurl}/login`,
        { email: email, password: password },
        {
          headers: new HttpHeaders({
            Accept: 'application/json',
          }),
        }
      )
      .pipe(
        map((resData) => {
          const responseObj = {
            token: resData.data.token,
            user: resData.data.user,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this._token = responseObj.token;
          this.user = responseObj.user;
          localStorage.setItem('token', this.token);
          this.isAuthenticated.next(true);
        })
      );
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }
}
