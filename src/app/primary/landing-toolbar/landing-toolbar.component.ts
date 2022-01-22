import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SearchApiService } from 'src/app/main-app/services/search-api.service';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-landing-toolbar',
  templateUrl: './landing-toolbar.component.html',
  styleUrls: ['./landing-toolbar.component.scss'],
})
export class LandingToolbarComponent implements OnInit {
  searchControl!: string;
  isLoggedIn: boolean = false;
  searchData!: Search[];
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private searchApi: SearchApiService
  ) {}

  ngOnInit(): void {
    let user = this.authService.user;
    this.authService.isAuthenticated.subscribe((bool) => {
      this.isLoggedIn = bool;
    });
  }

  onLogout() {
    this.authService.logout();
    console.log(this.authService.isAuthenticated, this.isLoggedIn);
  }
  onChangeSearch() {
    this.searchApi.searchMicrobes(this.searchControl).subscribe((response) => {
      console.log(response.data);
      this.searchData = response.data;
    });
  }
  onSubmitOption(id: number) {}
}
