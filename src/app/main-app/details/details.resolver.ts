import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Details } from 'src/app/models/details.interface';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class DetailsResolver implements Resolve<Details> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Details> {
    const microbeId = route.params['id'];
    return this.api.getDetails(microbeId);
  }
}
