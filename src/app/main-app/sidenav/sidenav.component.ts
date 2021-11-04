import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  onSmallScreen: boolean = false;
  sidenavMode: any = 'side';
  userLoggedin: boolean = false;

  constructor(
    private breakPointsObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.breakPointsObserver
      .observe([Breakpoints.HandsetPortrait] || [Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        if (result.matches) {
          this.onSmallScreen = true;
          this.sidenavMode = 'over';
        }
      });
  }
  nodeClicked() {
    if (this.onSmallScreen) {
      this.sidenav.close();
    }
  }

  ngOnInit(): void {
    console.log(this.authService.user);
  }
}
