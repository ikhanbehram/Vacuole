import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { map, take, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MicrobeCard } from 'src/app/models/microbeCard.model';
import { responseData } from 'src/app/models/microbesResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private microbeCards = new Subject<responseData>();
  private _baseURL = 'https://www.vacuole.kashifdev.com';

  constructor(private http: HttpClient) {}

  get fetchMicrobes() {
    return this.microbeCards.asObservable();
  }

  getMicrobeCategories() {
    return this.http.get<Categories>(`${this._baseURL}/categories`).pipe(
      take(1),
      map((categories) => {
        return categories.data;
      })
    );
  }

  getAllMicrobes(pageNo?: number) {
    let requestUrl = `${this._baseURL}/microbes`;
    if (pageNo) {
      console.info('We are paginating');
      const params = new HttpParams().set('page', pageNo);
      return this.http.get<responseData>(requestUrl, { params: params }).pipe(
        map((resData) => {
          const responseObj: responseData = {
            data: resData.data,
            next_page_url: resData.next_page_url,
            prev_page_url: resData.prev_page_url,
            links: resData.links,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this.microbeCards.next(responseObj);
        })
      );
    } else {
      console.info('We are not paginating');
      return this.http.get<responseData>(requestUrl).pipe(
        map((resData) => {
          const responseObj: responseData = {
            data: resData.data,
            next_page_url: resData.next_page_url,
            prev_page_url: resData.prev_page_url,
            links: resData.links,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this.microbeCards.next(responseObj);
        })
      );
    }

    // return this.organismCards.asObservable();
  }

  getMicrobesByCategories(parent: string, id: number, pageNo?: number) {
    if (parent === 'true') {
      return this.getParentMicrobes(id, pageNo);
    }
    return this.getChildMicrobes(id, pageNo);
  }
  getParentMicrobes(id: number, pageNo?: number) {
    let requestUrl = `${this._baseURL}/categories/${id}`;
    if (pageNo) {
      console.info('We are paginating');
      const params = new HttpParams().set('page', pageNo);
      return this.http.get<responseData>(requestUrl, { params: params }).pipe(
        map((resData) => {
          const responseObj: responseData = {
            data: resData.data,
            next_page_url: resData.next_page_url,
            prev_page_url: resData.prev_page_url,
            links: resData.links,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this.microbeCards.next(responseObj);
        })
      );
    } else {
      console.info('We are not paginating');
      return this.http.get<responseData>(requestUrl).pipe(
        map((resData) => {
          const responseObj: responseData = {
            data: resData.data,
            next_page_url: resData.next_page_url,
            prev_page_url: resData.prev_page_url,
            links: resData.links,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this.microbeCards.next(responseObj);
        })
      );
    }
  }
  getChildMicrobes(id: number, pageNo?: number) {
    let requestUrl = `${this._baseURL}/sub-categories/${id}`;
    if (pageNo) {
      console.info('We are paginating');
      const params = new HttpParams().set('page', pageNo);
      return this.http.get<responseData>(requestUrl, { params: params }).pipe(
        map((resData) => {
          const responseObj: responseData = {
            data: resData.data,
            next_page_url: resData.next_page_url,
            prev_page_url: resData.prev_page_url,
            links: resData.links,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this.microbeCards.next(responseObj);
        })
      );
    } else {
      console.info('We are not paginating');
      return this.http.get<responseData>(requestUrl).pipe(
        map((resData) => {
          const responseObj: responseData = {
            data: resData.data,
            next_page_url: resData.next_page_url,
            prev_page_url: resData.prev_page_url,
            links: resData.links,
          };
          return responseObj;
        }),
        tap((responseObj) => {
          this.microbeCards.next(responseObj);
        })
      );
    }
  }
}
