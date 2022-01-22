import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string
  ) {}

  searchMicrobes(searchQuery: string) {
    return this.http.post<{ data: Search[] }>(
      `${this.baseUrl}/microbes/search`,
      {
        search: searchQuery,
      }
    );
  }
}
