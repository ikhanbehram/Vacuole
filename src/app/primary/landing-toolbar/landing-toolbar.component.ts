import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-landing-toolbar',
  templateUrl: './landing-toolbar.component.html',
  styleUrls: ['./landing-toolbar.component.scss'],
})
export class LandingToolbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}

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
