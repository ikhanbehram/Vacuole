import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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
  private _token = '';
  user!: User;
  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseurl: string
  ) {}

  get token() {
    return this._token;
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
        })
      );
  }
}
