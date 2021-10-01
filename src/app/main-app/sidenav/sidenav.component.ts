import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  onSmallScreen: boolean = false;
  sidenavMode: any = 'side';

  constructor(private breakPointsObserver: BreakpointObserver) {
    this.breakPointsObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.onSmallScreen = true;
          this.sidenavMode = 'side';
        }
      });
  }

  ngOnInit(): void {}
}
