import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(public dialog: MatDialog, private authService: AuthService) {}

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
}
