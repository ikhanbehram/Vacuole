import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Search } from 'src/app/models/search.model';
import { SearchApiService } from '../services/search-api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
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
  onSubmitOption(id: number) {
    
  }
}
