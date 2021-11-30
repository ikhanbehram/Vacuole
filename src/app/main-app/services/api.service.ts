import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { map, take, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { responseData } from 'src/app/models/microbesResponse.model';
import { Details } from 'src/app/models/details.interface';
import { MicrobeCard } from 'src/app/models/microbeCard.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private microbeCards = new Subject<responseData>();
  private collectedMicrobes = new Subject<MicrobeCard[]>();

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string
  ) {}

  get fetchMicrobes() {
    return this.microbeCards;
  }

  get fetchCollectedMicrobes() {
    return this.collectedMicrobes;
  }

  getMicrobeCategories() {
    return this.http.get<Categories>(`${this.baseUrl}/categories`).pipe(
      take(1),
      map((categories) => {
        return categories.data;
      })
    );
  }

  getAllMicrobes(pageNo?: number) {
    let requestUrl = `${this.baseUrl}/microbes`;
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
    let requestUrl = `${this.baseUrl}/categories/${id}`;
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
    let requestUrl = `${this.baseUrl}/sub-categories/${id}`;
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

  getDetails(id: number) {
    const requestUrl = `${this.baseUrl}/microbes/${id}`;
    return this.http.get<Details>(requestUrl);
  }

  getCollectedMicrobes() {
    return this.http.get<responseData>(`${this.baseUrl}/collection`).pipe(
      map((responseData) => {
        return responseData.data;
      }),
      tap((data) => {
        this.collectedMicrobes.next(data);
      })
    );
  }
  //for collecting and deCollecting microbes
  collectDecollectMicrobe(collected: boolean, id: number) {
    if (collected) {
      this.deCollectMicrobe(id);
    } else {
      this.collectMicrobe(id);
    }
  }
  collectMicrobe(id: number) {
    this.http.patch(`${this.baseUrl}/collect/${id}`, '').subscribe((res) => {
      console.log(res);
    });
  }
  deCollectMicrobe(id: number) {
    this.http.patch(`${this.baseUrl}/decollect/${id}`, '').subscribe((res) => {
      console.log(res);
    });
  }
}
