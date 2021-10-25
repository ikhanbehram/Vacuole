import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { map, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MicrobeCard } from 'src/app/models/microbeCard.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  microbeCards = new BehaviorSubject<MicrobeCard[]>([
    // {
    //   title: 'Tobacco mosaid',
    //   description: 'hiadasdasd fdssdnfkjsfer jashdeur diasduenfra',
    //   image:
    //     'https://media.istockphoto.com/photos/beneficial-healthy-intestinal-bacterium-micro-flora-picture-id1091692964?k=20&m=1091692964&s=612x612&w=0&h=IZLsHGACNWywdeOUeF4R8QORtvxs9lhZiqLyAB-4tzE=',
    // },
    // {
    //   title: 'Tobacco mosaid',
    //   description: 'hiadasdasd fdssdnfkjsfer jashdeur diasduenfra',
    //   image:
    //     'https://media.istockphoto.com/photos/beneficial-healthy-intestinal-bacterium-micro-flora-picture-id1091692964?k=20&m=1091692964&s=612x612&w=0&h=IZLsHGACNWywdeOUeF4R8QORtvxs9lhZiqLyAB-4tzE=',
    // },
  ]);
  private _baseURI = 'https://www.vacuole.kashifdev.com';

  constructor(private http: HttpClient) {}
  getMicrobeCategories() {
    return this.http.get<Categories>(this._baseURI + '/categories').pipe(
      take(1),
      map((categories) => {
        return categories.data;
      })
    );
  }

  getAllMicrobes() {
    return this.http
      .get<{ data: MicrobeCard[] }>(this._baseURI + '/microbes')
      .pipe(
        map((resData) => {
          const cards = resData.data;
          return cards;
        }),
        tap((cards) => {
          this.microbeCards.next(cards);
        })
      );
    // return this.organismCards.asObservable();
  }

  getMicrobesByCategories(parent: string, id: number) {
    if (parent === 'true') {
      return this.getParentMicrobes(id);
    }
    return this.getChildMicrobes(id);
  }
  getParentMicrobes(id: number) {
    return this.http
      .get<{ data: MicrobeCard[] }>(this._baseURI + '/categories/' + id)
      .pipe(
        map((resData) => {
          const cards = resData.data;
          return cards;
        }),
        tap((cards) => {
          this.microbeCards.next(cards);
        })
      );
  }
  getChildMicrobes(id: number) {
    return this.http
      .get<{ data: MicrobeCard[] }>(this._baseURI + '/sub-categories/' + id)
      .pipe(
        map((resData) => {
          const cards = resData.data;
          return cards;
        }),
        tap((cards) => {
          this.microbeCards.next(cards);
        })
      );
  }
}
