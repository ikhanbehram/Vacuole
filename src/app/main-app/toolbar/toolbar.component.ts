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
    let token = localStorage.getItem('token');
    if (user || token) {
      this.isLoggedIn = true;
    }
  }
}
